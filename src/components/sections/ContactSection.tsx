import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { staggerContainer, staggerItem, fadeInLeft, fadeInRight } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import personal from '@/data/personal';
import type { ContactForm } from '@/types';

// ── EmailJS credentials (set in .env.local — never commit secrets) ───────────
// Copy .env.example → .env.local and fill in your values from emailjs.com
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;
// ─────────────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'sending' | 'success' | 'error';

const INITIAL: ContactForm = { name: '', email: '', subject: '', message: '' };

export default function ContactSection() {
  const { ref, inView } = useScrollReveal();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm]     = useState<ContactForm>(INITIAL);
  const [status, setStatus] = useState<Status>('idle');
  const [errMsg, setErrMsg] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrMsg('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          subject:      form.subject,
          message:      form.message,
          to_email:     personal.email,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setErrMsg('Failed to send message. Please email me directly at ' + personal.email);
    }
  };

  return (
    <section id="contact" className="py-24 bg-dark" ref={ref}>
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={staggerItem} className="mb-12">
            <span className="section-label bg-white text-dark">Contact</span>
            <h2 className="section-title text-white">Let's Work Together</h2>
            <p className="section-subtitle text-slate-400">I'm always open to new opportunities and collaborations</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Left — info */}
            <motion.div variants={fadeInLeft} className="lg:col-span-2 space-y-6">
              <div
                className="border-2 border-white p-6"
                style={{ boxShadow: '4px 4px 0 #fff' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Mail size={18} className="text-primary" />
                  <div>
                    <p className="font-body text-xs text-slate-400">Email</p>
                    <a href={`mailto:${personal.email}`} className="font-mono text-sm text-white hover:text-primary transition-colors">
                      {personal.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-secondary" />
                  <div>
                    <p className="font-body text-xs text-slate-400">Location</p>
                    <p className="font-mono text-sm text-white">{personal.location}</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-3">
                {[
                  { icon: Github,   href: personal.social.github,  label: 'GitHub' },
                  { icon: Linkedin, href: personal.social.linkedin, label: 'LinkedIn' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="border-2 border-white text-white p-3 hover:bg-white hover:text-dark transition-colors"
                    style={{ boxShadow: '3px 3px 0 #fff' }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              <div className="glass-dark rounded-xl p-5">
                <p className="font-body text-sm text-slate-300 leading-relaxed">
                  I typically respond within <strong className="text-white">24–48 hours</strong>.
                  Whether it's a project idea, internship opportunity, or just a hello — feel free to reach out!
                </p>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div variants={fadeInRight} className="lg:col-span-3">
              <form
                ref={formRef}
                onSubmit={onSubmit}
                className="border-2 border-white bg-white/5 p-8 space-y-5"
                style={{ boxShadow: '6px 6px 0 #fff' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-xs text-slate-400 block mb-2">Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      required
                      placeholder="Your Name"
                      className="brutal-input bg-transparent text-white placeholder:text-slate-600 border-white focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-slate-400 block mb-2">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      placeholder="you@email.com"
                      className="brutal-input bg-transparent text-white placeholder:text-slate-600 border-white focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-slate-400 block mb-2">Subject *</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    required
                    placeholder="What's this about?"
                    className="brutal-input bg-transparent text-white placeholder:text-slate-600 border-white focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-slate-400 block mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="brutal-input bg-transparent text-white placeholder:text-slate-600 border-white focus:border-primary resize-none"
                  />
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-400 text-sm font-body">
                    <CheckCircle size={16} />
                    Message sent! I'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm font-body">
                    <AlertCircle size={16} />
                    {errMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="brutal-btn bg-primary text-white w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
