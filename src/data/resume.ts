import type { Experience, Education, Certification, Achievement } from '@/types';

export const experience: Experience[] = [
  {
    id: 'exp-aptitude-guru',
    company: 'Aptitude Guru Pvt. Ltd.',
    role: 'Software Developer Intern',
    duration: '2025',
    startDate: 'Jan 2025',
    endDate: 'Present',
    description: [
      'Developed a Library Management System that efficiently handles book inventory, borrowing, due-date tracking, and automated fine calculation for overdue returns.',
      'Implemented features for book donations and dynamic stock updates, improving resource availability tracking.',
      'Designed full CRUD operations to manage student book requests, approvals, and circulation records.',
      'Ensured smooth circulation management and accurate tracking of library resources for the institution.',
    ],
    techStack: ['Java', 'MySQL', 'Spring Boot', 'REST APIs'],
    type: 'internship',
  },
];

export const education: Education[] = [
  {
    id: 'edu-sece',
    institution: 'Sri Eshwar College of Engineering',
    degree: 'Bachelor of Engineering (B.E)',
    field: 'Computer Science and Engineering',
    startYear: '2022',
    endYear: '2026',
    score: '8.0',
    scoreType: 'CGPA',
    description:
      'Relevant coursework: Data Structures & Algorithms, DBMS, Operating Systems, Web Technologies, Machine Learning, Computer Networks.',
  },
  {
    id: 'edu-school',
    institution: 'Higher Secondary School',
    degree: 'Higher Secondary Certificate (XII)',
    field: 'Computer Science, Mathematics, Physics',
    startYear: '2020',
    endYear: '2022',
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-google-ux',
    title: 'Foundations of User Experience (UX) Design',
    provider: 'Google / Coursera',
    date: '2024',
  },
  {
    id: 'cert-python',
    title: 'Python for Everybody',
    provider: 'University of Michigan / Coursera',
    date: '2023',
  },
  {
    id: 'cert-react',
    title: 'React — The Complete Guide',
    provider: 'Udemy',
    date: '2024',
  },
];

export const achievements: Achievement[] = [
  {
    id: 'ach-khacks',
    title: 'KHacks 3.0 Hackathon — Team CodeNeticz',
    description:
      'Built ACLC (Adaptive Cognitive Learning Classroom), an AI-powered platform for students with learning disabilities, competing against teams from across Tamil Nadu.',
    date: 'May 2025',
  },
  {
    id: 'ach-cgpa',
    title: 'Academic Excellence — 8.0 CGPA',
    description:
      'Maintained a strong CGPA of 8.0 throughout the B.E Computer Science program at Sri Eshwar College of Engineering, Coimbatore.',
  },
];
