export interface Certification {
  id: string;
  category: string;
  title: string;
  link?: string;
}

export const certifications: Certification[] = [
  // Cybersecurity
  {
    id: 'cert-1',
    category: 'Cybersecurity',
    title: 'Play It Safe: Manage Security Risks from Google',
  },
  {
    id: 'cert-2',
    category: 'Cybersecurity',
    title: 'Foundations of Cybersecurity',
  },

  // Programming & Development
  {
    id: 'cert-3',
    category: 'Programming & Development',
    title: 'Web Designing Certification (Chandigarh University)',
  },
  {
    id: 'cert-4',
    category: 'Programming & Development',
    title: 'IIT Madras Reverse Coding X',
  },

  // Design Thinking & Innovation
  {
    id: 'cert-5',
    category: 'Design Thinking & Innovation',
    title: 'Design Thinking and Creativity in Business & Tech',
  },
  {
    id: 'cert-6',
    category: 'Design Thinking & Innovation',
    title: 'Learning Design Thinking',
  },
  {
    id: 'cert-7',
    category: 'Design Thinking & Innovation',
    title: 'Critical Thinking Mindset',
  },

  // Achievements & Competitions
  {
    id: 'cert-8',
    category: 'Achievements & Competitions',
    title: 'CSI eSuraksha Hackathon (Top 10 Teams)',
  },

  // Cloud & Data
  {
    id: 'cert-9',
    category: 'Cloud & Data',
    title: 'AWS Solution Architect Associate',
    link: 'https://www.linkedin.com/posts/pavan-sharma-1645ab276_aws-cloudcomputing-cloudnative-ugcPost-7444095353509023744-iqX4',
  },
  {
    id: 'cert-10',
    category: 'Cloud & Data',
    title: 'Database and SQL for Data Science with Python',
    link: 'https://www.linkedin.com/posts/pavan-sharma-1645ab276_completion-certificate-for-databases-and-share-7426914086841470976-3PKY',
  }
];
