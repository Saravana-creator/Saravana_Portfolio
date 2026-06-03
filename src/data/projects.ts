import type { Project } from '@/types';

const projects: Project[] = [
  {
    id: 'aclc',
    title: 'ACLC — Adaptive Cognitive Learning Classroom',
    description:
      'An AI-powered adaptive educational platform built for students with cognitive disabilities (Dyslexia, Dyscalculia, Dysgraphia). The classroom conducts a diagnostic assessment and dynamically adapts its UI, tools, and assistants — offering text simplification via BART, Speech-to-Text for dysgraphia, and visual math animations for dyscalculia.',
    techStack: ['React', 'Node.js', 'Express', 'Python', 'HuggingFace BART', 'MongoDB', 'Web Speech API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/pradeep-1200/CodeNeticz-KHacks-3.0',
    category: 'ai',
    featured: true,
    year: 2025,
  },
  {
    id: 'helpai',
    title: 'HelpAI — RAG-Based NCERT Study Assistant',
    description:
      'An intelligent study assistant for students in grades 6–10 built using Retrieval-Augmented Generation (RAG). Students can ask questions about their NCERT curriculum and receive accurate, context-aware answers powered entirely by open-source language models — no expensive API costs.',
    techStack: ['Python', 'LangChain', 'FAISS', 'Open-Source LLMs', 'FastAPI', 'React'],
    category: 'ai',
    featured: true,
    year: 2025,
  },
  {
    id: 'loomlook',
    title: 'Loom Look — Artisan Handcraft Marketplace',
    description:
      'A full-stack e-commerce platform connecting traditional handcrafted artisans directly with buyers. Features include product listings, artisan profiles, cart & checkout, and an admin dashboard — built to preserve and promote authentic handcraft culture in the digital age.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Cloudinary'],
    category: 'fullstack',
    featured: true,
    year: 2024,
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description:
      'This very portfolio — built with a Neo-Brutalism + Glassmorphism design system. Features include a custom loading screen, animated skill bars, project filter tabs, scroll-reveal animations, and a contact form. Optimised for performance and SEO.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'EmailJS'],
    githubUrl: 'https://github.com/Saravana-creator',
    category: 'frontend',
    featured: false,
    year: 2025,
  },
];

export default projects;
