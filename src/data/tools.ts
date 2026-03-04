export interface Tool {
  name: string;
  category: string;
  description: string;
  icon: string;
  color: string;
}

export const tools: Tool[] = [
  // Frontend
  { name: 'React', category: 'Frontend', description: 'Component-based UI library for building interactive interfaces', icon: '⚛️', color: '#61DAFB' },
  { name: 'JavaScript', category: 'Frontend', description: 'High-performance, dynamic programming language', icon: '▲', color: '#FFD43B' },
  { name: 'TypeScript', category: 'Frontend', description: 'Typed superset of JavaScript for safer, scalable code', icon: '🔷', color: '#3178C6' },
  { name: 'Ether.js', category: 'Frontend', description: 'Complete library for interacting with the Ethereum blockchain', icon: '🎮', color: '#00FFFF' },
  { name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first CSS framework for rapid UI development', icon: '🎨', color: '#06B6D4' },

  // Backend
  { name: 'Node.js', category: 'Backend', description: 'JavaScript runtime for server-side applications', icon: '🟢', color: '#339933' },
  { name: 'Express', category: 'Backend', description: 'Minimal web framework for building REST APIs', icon: '🚀', color: '#FFFFFF' },
  { name: 'Go', category: 'Backend', description: 'Versatile language for backend and scripting', icon: '🔷', color: '#FFD43B' },
  { name: 'REST API', category: 'Backend', description: 'Modern high-performance Python web framework', icon: '⚡', color: '#009688' },
  { name: 'PostgreSQL', category: 'Backend', description: 'Advanced open-source relational database', icon: '🐘', color: '#4169E1' },
  { name: 'MongoDB', category: 'Backend', description: 'NoSQL document database for flexible data models', icon: '🍃', color: '#47A248' },
  { name: 'Grafana', category: 'Backend', description: 'Open-source observability platform for visualizing metrics and logs', icon: '📊', color: '#F46800' },
  { name: 'Coralogix', category: 'Backend', description: 'Advanced log management platform for centralized logging', icon: '📊', color: '#F46800' },
  { name :'Redis', category: 'Backend', description: 'In-memory data structure store', icon: '📊', color: '#F46800' },
  { name :'Git', category: 'Backend', description: 'Version control system for tracking changes', icon: '📊', color: '#F46800' },


  // Blockchain
  { name: 'Solidity', category: 'Blockchain', description: 'Smart contract language for Ethereum Virtual Machine', icon: '💎', color: '#8A2BE2' },
  { name: 'Hardhat', category: 'Blockchain', description: 'Ethereum development environment for testing and deployment', icon: '🔨', color: '#FFF100' },
  { name: 'Ethers.js', category: 'Blockchain', description: 'Complete library for interacting with the Ethereum blockchain', icon: '🔗', color: '#00FFFF' },
  { name: 'IPFS', category: 'Blockchain', description: 'Decentralized storage protocol for distributed file systems', icon: '📦', color: '#65C2CB' },
 
  // DevOps
  { name: 'Docker', category: 'DevOps', description: 'Container platform for consistent development environments', icon: '🐳', color: '#2496ED' },
  { name: 'Kubernetes', category: 'DevOps', description: 'Container orchestration for automated deployment and scaling', icon: '☸️', color: '#326CE5' },
  { name: 'Azure', category: 'DevOps', description: 'Cloud computing platform for scalable infrastructure', icon: '☁️', color: '#FF9900' },
  { name: 'GitHub Actions', category: 'DevOps', description: 'CI/CD automation directly integrated with GitHub', icon: '🔄', color: '#2088FF' },
];

export const toolCategories = ['All', 'Frontend', 'Backend', 'Blockchain', 'DevOps'];
