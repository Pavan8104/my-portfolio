export interface Tool {
  name: string;
  category: string;
  description: string;
  icon: string;
  color: string;
}

export const tools: Tool[] = [
  // Core Skills
  { name: 'Data Structures & Algorithms', category: 'Core Skills', description: 'Advanced problem-solving and optimization', icon: '🧠', color: '#8A2BE2' },
  { name: 'AI & Machine Learning', category: 'Core Skills', description: 'Building intelligent systems using large language models', icon: '🤖', color: '#06B6D4' },
  { name: 'Data Science', category: 'Core Skills', description: 'Analyzing data to derive actionable insights', icon: '📊', color: '#F46800' },
  { name: 'Full Stack Development', category: 'Core Skills', description: 'Building end-to-end web and backend applications', icon: '🌐', color: '#339933' },

  // Tech Stack
  { name: 'Python', category: 'Tech Stack', description: 'High-level programming language for AI and backend', icon: '🐍', color: '#FFD43B' },
  { name: 'C++', category: 'Tech Stack', description: 'High-performance systems and competitive programming', icon: '🚀', color: '#00599C' },
  { name: 'Java', category: 'Tech Stack', description: 'Object-oriented programming language', icon: '☕', color: '#F89820' },
  { name: 'JavaScript', category: 'Tech Stack', description: 'Dynamic programming language for web', icon: '▲', color: '#F7DF1E' },
  { name: 'HTML & CSS', category: 'Tech Stack', description: 'Markup and styling for web interfaces', icon: '🎨', color: '#E34F26' },
  { name: 'DBMS', category: 'Tech Stack', description: 'Database management systems', icon: '🗄️', color: '#4169E1' },
  { name: 'Git & GitHub', category: 'Tech Stack', description: 'Version control and collaboration', icon: '🐙', color: '#F05032' },
];

export const toolCategories = ['All', 'Core Skills', 'Tech Stack'];
