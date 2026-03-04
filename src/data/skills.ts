export interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

export const skills: Skill[] = [
  { name: 'golang', level: 95, category: 'Backend', icon: '🔵' },
  { name: 'TypeScript', level: 92, category: 'Backend', icon: '🔷' },
  { name: 'Git', level: 82, category: 'Version control', icon: '🎮' },
  { name: 'Node.js & Express', level: 88, category: 'Backend', icon: '🟢' },
  { name: 'Solidity', level: 78, category: 'Blockchain', icon: '⛓️' },
  { name: 'Hardhat & Foundry', level: 75, category: 'Blockchain', icon: '🔨' },
  { name: 'Docker', level: 70, category: 'DevOps', icon: '🐳' },
  { name: 'Azure deployment', level: 72, category: 'DevOps', icon: '☁️' },
  { name: 'PostgreSQL & MongoDB', level: 85, category: 'Backend', icon: '🗄️' },
];

export const categories = ['All', 'Frontend', 'Backend', 'Blockchain', 'DevOps'];
