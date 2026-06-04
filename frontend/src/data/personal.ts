import type { PersonalInfo } from '@/types';

const personal: PersonalInfo = {
  name: 'Saravana Perumal M',
  firstName: 'Saravana',
  tagline: 'Crafting adaptive, intelligent web experiences.',
  roles: [
    'Full Stack Developer',
    'React Developer',
    'AI/ML Enthusiast',
    'Problem Solver',
    'Open Source Contributor',
  ],
  bio: `I'm a passionate Full Stack Developer and final-year CSE student from Tamil Nadu, India.
  I love building intelligent, user-centric applications — from adaptive AI-powered classrooms
  to RAG-based educational tools. I specialize in the React / Node.js ecosystem and enjoy
  bridging the gap between cutting-edge AI and real-world usability.`,
  location: 'Salem, Tamil Nadu, India',
  email: 'saravana24057@gmail.com',
  avatar: '/images/avatar.jpg',
  resumeUrl: '/resume.pdf',
  social: {
    github:   'https://github.com/Saravana-creator',
    linkedin: 'https://www.linkedin.com/in/saravana-perumal-m-533196327/',
  },
  stats: [
    { label: 'Years Coding',   value: '3+' },
    { label: 'Projects Built', value: '10+' },
    { label: 'Technologies',   value: '15+' },
    { label: 'GitHub Repos',   value: '20+' },
  ],
};

export default personal;
