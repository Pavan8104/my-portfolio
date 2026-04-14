export type DomainKey = 'AI / RAG' | 'Data Science' | 'Frontend';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  domain?: DomainKey;
}

export const projects: Project[] = [
  // FEATURED PROJECTS (TOP 4)
  {
    id: '1',
    title: 'Web Traffic Analyzer',
    description: 'A data-driven application that analyzes user behavior and trends to generate insights.',
    tags: ['Python', 'Data Analysis'],
    github: 'https://github.com/Pavan8104/web-traffic-analyzer',
    live: 'https://web-traffic-analyzer-gcktqq67lcxkpqdao4ubxs.streamlit.app/',
    featured: true,
    domain: 'Data Science',
  },
  {
    id: '2',
    title: 'Sentinel AI: LLM Red Teaming Framework',
    description: 'A human-centric AI safety system designed to evaluate and improve the robustness of Large Language Models (LLMs) through adversarial attacks, alignment checks, and safety mechanisms.',
    tags: ['Python', 'AI/ML', 'Security', 'LLM'],
    github: 'https://github.com/Pavan8104/llm-red-teaming-framework',
    featured: true,
  },
  {
    id: '3',
    title: 'Finance Analytics Backend',
    description: 'A robust Python-based backend system for financial data analytics, forecasting, and processing.',
    tags: ['Python', 'Backend', 'Data Processing'],
    github: 'https://github.com/Pavan8104/finance-analytics-backend',
    featured: true,
  },
  {
    id: '4',
    title: 'Laptop Price Prediction Model',
    description: 'A machine learning model utilizing regression techniques to accurately predict laptop prices based on hardware specifications.',
    tags: ['Jupyter', 'Machine Learning', 'Data Science'],
    github: 'https://github.com/Pavan8104/laptop_Price_Predicition',
    featured: true,
  },
  
  // SECONDARY PROJECTS
  {
    id: '5',
    title: 'Face Recognition System',
    description: 'An automated facial recognition and detection system built and optimized for macOS environments.',
    tags: ['Python', 'Computer Vision', 'AI'],
    github: 'https://github.com/Pavan8104/Face-recogination-mac-environment',
  },
  {
    id: '6',
    title: 'Advanced DSA & CP',
    description: 'A rich collection of advanced Data Structures and Algorithms implementations and competitive programming solutions.',
    tags: ['C++', 'DSA', 'Problem Solving'],
    github: 'https://github.com/Pavan8104/CP',
  },
  {
    id: '7',
    title: 'Beamish Quokka',
    description: 'An interactive web application showcasing seamless UI/UX design components and responsive layouts.',
    tags: ['React', 'Web'],
    live: 'https://beamish-quokka-a52603.netlify.app/',
    domain: 'AI / RAG',
  },
  {
    id: '8',
    title: 'Courageous Queijadas',
    description: 'A dynamic frontend project with a strong focus on strict component architecture and performance.',
    tags: ['Frontend', 'UI/UX'],
    live: 'https://courageous-queijadas-29ed28.netlify.app/',
    domain: 'AI / RAG',
  },
  {
    id: '9',
    title: 'Vocal Mermaid',
    description: 'An exploratory web interface demonstrating responsive grids and strict accessibility rules.',
    tags: ['React', 'CSS'],
    live: 'https://vocal-mermaid-e3da67.netlify.app/',
    domain: 'Frontend',
  },
  {
    id: '10',
    title: 'Zingy Concha',
    description: 'A creative web application highlighting modern design principles and high-end animations.',
    tags: ['Web', 'Design'],
    live: 'https://zingy-concha-a4fc90.netlify.app/',
    domain: 'Frontend',
  },
  {
    id: '11',
    title: 'PSpotify',
    description: 'A custom music streaming interface clone featuring audio integrations and sleek dark-mode styling.',
    tags: ['React', 'Media'],
    live: 'https://pspotify-5e3a57.netlify.app/',
    domain: 'Frontend',
  },
  {
    id: '12',
    title: 'Portfolio Website',
    description: 'A dark-themed cyberpunk interactive portfolio for showcasing professional projects and skills.',
    tags: ['React', 'Three.js', 'Tailwind'],
    live: 'https://pavan-sharma-portfolio.netlify.app/',
    domain: 'Frontend',
  },
  {
    id: '13',
    title: 'Flourishing Sfogliatella',
    description: 'A modern landing page application built to demonstrate rapid prototyping and Vercel/Netlify deployment.',
    tags: ['Frontend', 'Deployment'],
    live: 'https://flourishing-sfogliatella-b25a54.netlify.app/',
    domain: 'Frontend',
  }
];
