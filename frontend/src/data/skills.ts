import type { SkillCategory } from '@/types';

const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    color: '#4F46E5',
    skills: [
      { name: 'React',       level: 75 },
      { name: 'Next.js',     level: 60 },
      { name: 'JavaScript',  level: 80 },
      { name: 'TypeScript',  level: 68 },
      { name: 'HTML/CSS',    level: 85 },
      { name: 'Tailwind CSS',level: 70 },
    ],
  },
  {
    category: 'Backend',
    color: '#06B6D4',
    skills: [
      { name: 'Node.js',    level: 82 },
      { name: 'Express.js', level: 78 },
      { name: 'Spring Boot',level: 65 },
      { name: 'REST APIs',  level: 70 },
    ],
  },
  {
    category: 'Database',
    color: '#14B8A6',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'MySQL',   level: 82 },
      { name:'PostgreSQL', level:78 }
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
      { name: 'Git/GitHub', level: 88 },
      { name: 'VS Code',    level: 75 },
      { name: 'Postman',    level: 70 },
      { name: 'Docker',     level: 50 },
    ],
  },
];

export default skills;
