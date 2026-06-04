# Saravana Perumal M — Developer Portfolio

A modern, high-performance developer portfolio built with **React + TypeScript + Vite**.

Design system: **Neo-Brutalism + Glassmorphism** | Animations: **Framer Motion** | Styling: **Tailwind CSS**

Live: _deploy to Vercel/Netlify after filling in your credentials_

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Then open .env.local and fill in your EmailJS credentials
```

### 3. Start the dev server
```bash
npm run dev
# → http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, LoadingScreen
│   └── sections/        # HeroSection, AboutSection, SkillsSection,
│                        # ProjectsSection, ExperienceSection, ContactSection
├── data/                # ← Edit your personal info here
│   ├── personal.ts      # Name, bio, socials, stats
│   ├── projects.ts      # Your projects
│   ├── resume.ts        # Education, experience, certs, achievements
│   └── skills.ts        # Skill categories & proficiency levels
├── hooks/               # useScrollReveal
├── lib/                 # animations.ts, api.ts, utils.ts
└── types/               # Shared TypeScript types
public/
├── favicon.svg          # Brand favicon
├── images/
│   └── avatar.jpg       # ← Place your photo here
└── resume.pdf           # ← Place your resume PDF here
```

---

## ✏️ Personalising the Site

All content lives in `src/data/`. You never need to touch component files for data changes.

| File | What to edit |
|---|---|
| `src/data/personal.ts` | Name, bio, email, socials, stats |
| `src/data/projects.ts` | Add / update projects |
| `src/data/resume.ts` | Education, internships, certifications |
| `src/data/skills.ts` | Technologies & proficiency levels |

### Contact Form (EmailJS)

1. Sign up free at <https://www.emailjs.com>
2. Create a **Service** (Gmail / Outlook) and copy the Service ID
3. Create an **Email Template** and copy the Template ID
4. Go to **Account → API Keys** and copy your Public Key
5. Add them to `.env.local`:
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```
6. Update `ContactSection.tsx` to read from env vars (see comment in the file)

---

## 🛠️ Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build → `dist/` |
| `npm run preview` | Preview the production build locally |

---

## 🚢 Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel --prod
```
Set your `VITE_EMAILJS_*` environment variables in the Vercel dashboard.

### Netlify
Drag and drop the `dist/` folder after running `npm run build`, or connect the GitHub repo.

---

## 🧰 Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** (build tool)
- **Tailwind CSS 3** (utility styling)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **react-type-animation** (typewriter effect)
- **@emailjs/browser** (contact form — no backend needed)

---

## 📄 License

MIT — free to use and adapt for your own portfolio.
