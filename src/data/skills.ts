export interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

export const skills: Skill[] = [
  { name: 'DSA', level: 90, category: 'Core Skills', icon: '🧠' },
  { name: 'AI & ML', level: 85, category: 'Core Skills', icon: '🤖' },
  { name: 'Data Science', level: 85, category: 'Core Skills', icon: '📊' },
  { name: 'Backend', level: 80, category: 'Core Skills', icon: '⚙️' },
  { name: 'Python', level: 90, category: 'Tech Stack', icon: '🐍' },
  { name: 'C++', level: 85, category: 'Tech Stack', icon: '🚀' },
  { name: 'Java', level: 80, category: 'Tech Stack', icon: '☕' },
  { name: 'Git', level: 85, category: 'Tech Stack', icon: '🐙' },
];

export const categories = ['All', 'Core Skills', 'Tech Stack'];
