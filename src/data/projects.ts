export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Video Streaming Backend',
    description: 'Full-featured YouTube-like backend with video upload, streaming, user auth, subscriptions, likes, comments, and tweet features — production-grade REST API.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'JWT'],
    github: 'https://github.com/Ms-10182/video-streaming-backend-project',
  },
  {
    id: '2',
    title: 'Feel Lite',
    description: 'Anonymous social media platform built end-to-end with AI content moderation, user authentication, media size management, and Redis caching. Deployed on Azure with Docker.',
    tags: ['React', 'Express.js', 'MongoDB', 'Redis', 'Azure', 'Docker'],
    github: 'https://github.com/Ms-10182/feel-lite',
    live: 'https://feel-lite.vercel.app/',
    featured: true,
  },
  {
    id: '3',
    title: 'ProofStamp',
    description: 'Backend system for a proof-of-authenticity and digital stamping platform. Enables verified document timestamping with tamper-proof records.',
    tags: ['Node.js', 'JavaScript', 'MongoDB', 'REST API'],
    github: 'https://github.com/Ms-10182/proofStamp-backend',
    featured: true,
  },
  {
    id: '4',
    title: 'Reckon Blockchain Backend',
    description: 'Waste management and tracking system using blockchain. Backend services for a blockchain-based logistic tracking system. Handles tracking of plastic waste from collection to recycling.',
    tags: ['Node.js', 'Ethereum', 'Ethers.js', 'MongoDB'],
    github: 'https://github.com/Ms-10182/Reckon-blockchain-backend',
  },
  {
    id: '5',
    title: 'HackWithChandigarh',
    description: 'Hackathon project — a full-stack web application built under time pressure, showcasing rapid prototyping and problem-solving skills.',
    tags: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
    github: 'https://github.com/Ms-10182/HackWithChandigarh',
  },
  {
    id: '6',
    title: 'Labor Backend',
    description: 'High-performance backend written in Go. Demonstrates concurrency patterns, REST API design, and efficient data handling with Go\'s native tooling.',
    tags: ['Go', 'REST API'],
    github: 'https://github.com/Ms-10182/labor-backend',
  },
];

