import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet());

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173', 'http://localhost:4173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body parser with size limits
app.use(express.json({ limit: '10kb' }));

// ── Rate Limiter ─────────────────────────────────────────────────────────────
// Limit contact form submission to 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    error: 'Too many contact requests from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    env: NODE_ENV
  });
});

// ── Contact API Endpoint ──────────────────────────────────────────────────────
app.post(
  '/api/contact',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({ max: 100 }).withMessage('Name must be under 100 characters.'),
    body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Please enter a valid email address.').normalizeEmail(),
    body('subject').trim().notEmpty().withMessage('Subject is required.').isLength({ max: 150 }).withMessage('Subject must be under 150 characters.'),
    body('message').trim().notEmpty().withMessage('Message is required.').isLength({ max: 2000 }).withMessage('Message must be under 2000 characters.')
  ],
  async (req, res) => {
    // 1. Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    console.log(`[Contact API] Received message from ${name} (${email}) - Subject: ${subject}`);

    // 2. Try EmailJS REST API transport first if configured
    const useEmailJS = 
      process.env.EMAILJS_PUBLIC_KEY && 
      process.env.EMAILJS_PRIVATE_KEY && 
      process.env.EMAILJS_SERVICE_ID && 
      process.env.EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      process.env.EMAILJS_TEMPLATE_ID &&
      process.env.EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';

    if (useEmailJS) {
      try {
        console.log('[Contact API] Sending email via EmailJS REST API...');
        
        const emailJSResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            accessToken: process.env.EMAILJS_PRIVATE_KEY,
            template_params: {
              from_name: name,
              from_email: email,
              subject: subject,
              message: message,
              to_email: process.env.EMAIL_TO || email // Deliver to configured inbox or fallback to sender for debugging
            }
          })
        });

        if (emailJSResponse.ok) {
          console.log('[Contact API] EmailJS message sent successfully.');
          return res.status(200).json({ success: true, message: 'Message sent successfully via EmailJS!' });
        } else {
          const errText = await emailJSResponse.text();
          console.error(`[Contact API] EmailJS REST API responded with status ${emailJSResponse.status}: ${errText}`);
          throw new Error(`EmailJS failed: ${errText}`);
        }
      } catch (error) {
        console.error('[Contact API] EmailJS transport failed:', error);
        // Fall through to Nodemailer if EmailJS fails
      }
    }

    // 3. Fallback to Nodemailer SMTP transport if configured
    const useSMTP = 
      process.env.SMTP_HOST && 
      process.env.SMTP_USER && 
      process.env.SMTP_PASS && 
      process.env.SMTP_PASS !== 'YOUR_GMAIL_APP_PASSWORD';

    if (useSMTP) {
      try {
        console.log('[Contact API] Sending email via Nodemailer SMTP...');
        
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        const mailOptions = {
          from: `"${name}" <${process.env.SMTP_USER}>`, // Most SMTP servers require the "from" to match authenticated user
          replyTo: email,
          to: process.env.EMAIL_TO,
          subject: `[Portfolio Contact] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h3>New Portfolio Contact Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 4px;">${message}</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('[Contact API] Nodemailer SMTP message sent successfully.');
        return res.status(200).json({ success: true, message: 'Message sent successfully via SMTP!' });
      } catch (error) {
        console.error('[Contact API] Nodemailer SMTP transport failed:', error);
      }
    }

    // 4. If no transport succeeded
    return res.status(500).json({
      error: 'Email delivery failed. No transport configured or all transports failed.'
    });
  }
);

// ── Error Handling Middleware ────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] Portfolio backend listening on port ${PORT} in ${NODE_ENV} mode.`);
});
