export interface PersonalInfo {
  name: string;
  firstName: string;
  tagline: string;
  roles: string[];
  bio: string;
  location: string;
  email: string;
  phone?: string;
  avatar?: string;
  resumeUrl: string;
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
    leetcode?: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  category: string;
  color: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'ai' | 'other';
  featured?: boolean;
  year: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  techStack?: string[];
  type: 'internship' | 'job' | 'freelance' | 'volunteer';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string | 'Present';
  score?: string;
  scoreType?: 'CGPA' | 'Percentage';
  description?: string;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
  icon?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
  errors?: { msg: string; path: string }[];
}
