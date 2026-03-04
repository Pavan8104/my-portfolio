export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  type: 'work' | 'education' | 'freelance' ;
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Engineering Intern',
    company: 'Razorpay',
    period: '2025 — Present',
    description: 'Worked on micro services for payment processing and fixed critical production bugs',
    tech: ['Golang', 'Docker', 'Kubernetes', 'Git','Grafana','Coralogix','QueryBook','postgresql'],
    type: 'work',
  },
  {
    id: 'exp-2',
    role: 'Full Stack Blockchain Developer Intern ',
    company: 'David Protocol',
    period: '2024 — Present',
    description: 'Built smart contract for decentralized blockchain based insurance platform',
    tech: ['React', 'Node.js', 'Typescript', 'Algorand'],
    type: 'work',
  },
  {
    id: 'exp-3',
    role: 'Full Stack Engineer',
    company: 'Self Project',
    period: '2025',
    description: 'Developed a end to end product of anonymous social media platform with proper error handling, user authentication, AI content moderation, and media size management',
    tech: ['React', 'Javascript','Express.js','Redis','MongoDB','Azure','Docker'],
    type: 'education',
  },
  {
    id: 'exp-4',
    role: 'Peer mentor',
    company: 'Chandigarh University',
    period: '2024',
    description: 'Mentored 500+ students during metacrafter bootcamp in blockchain and advanced web3 systems.',
    tech: ['React', 'Node.js', 'Typescript', 'Ethereum', 'Solidity', 'Hardhat', 'Algorand','Avalanche','Polygon','Javascript'],
    type: 'education',
  },
  {
    id: 'exp-5',
    role: 'B.Tech Computer Science',
    company: 'Chandigarh University',
    period: '2022 — 2026',
    description: 'Graduated with CSE honors. Focus on distributed systems, blockchain, and enterprise systems. Published 3 research papers.',
    tech: ['solidity', 'C++', 'Javascript', 'Linux'],
    type: 'education',
  },
];
