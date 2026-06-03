import type { SkillCategory } from '@/types';

const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    color: '#4F46E5',
    skills: [
      { name: 'React',       level: 90 },
      { name: 'Next.js',     level: 85 },
      { name: 'JavaScript',  level: 92 },
      { name: 'TypeScript',  level: 78 },
      { name: 'HTML/CSS',    level: 95 },
      { name: 'Tailwind CSS',level: 88 },
    ],
  },
  {
    category: 'Backend',
    color: '#06B6D4',
    skills: [
      { name: 'Node.js',    level: 87 },
      { name: 'Express.js', level: 85 },
      { name: 'Spring Boot',level: 72 },
      { name: 'REST APIs',  level: 88 },
    ],
  },
  {
    category: 'Database',
    color: '#14B8A6',
    skills: [
      { name: 'MongoDB', level: 83 },
      { name: 'MySQL',   level: 80 },
    ],
  },
  {
    category: 'Languages',
    color: '#8B5CF6',
    skills: [
      { name: 'Java',    level: 82 },
      { name: 'Python',  level: 78 },
      { name: 'C',       level: 75 },
      { name: 'C++',     level: 73 },
    ],
  },
  {
    category: 'Tools',
    color: '#F59E0B',
    skills: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'VS Code',    level: 95 },
      { name: 'Postman',    level: 85 },
      { name: 'Docker',     level: 60 },
    ],
  },
];

export default skills;
