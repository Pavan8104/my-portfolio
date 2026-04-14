export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  type: 'work' | 'education' | 'freelance' ;
  linkedin?: string;
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Solution Architect Intern',
    company: 'Hireonix AI',
    period: 'Present',
    description: 'Worked on analyzing platform data and deriving insights. Collaborated in team-based problem solving with a focus on structured thinking and real-world applications.',
    tech: ['Python', 'Data Science', 'Problem Solving'],
    type: 'work',
    linkedin: 'https://www.linkedin.com/posts/pavan-sharma-1645ab276_internship-solutionarchitect-hireonixai-share-7438654724213731328-5Sk-',
  },
  {
    id: 'exp-2',
    role: 'Software Engineer Intern',
    company: 'Hireonix AI',
    period: '2024',
    description: 'Contributed to software engineering projects and backend architectural development during an accelerated core internship phase.',
    tech: ['Software Engineering', 'Backend'],
    type: 'work',
    linkedin: 'https://www.linkedin.com/posts/pavan-sharma-1645ab276_softwareengineerintern-hieronixai-internshipjourney-share-7401664470483410945-ychW',
  },
  {
    id: 'exp-3',
    role: 'Frontend Engineer Intern',
    company: 'Wictronix',
    period: '2023',
    description: 'Helped develop responsive Web UI components and optimized frontend architectures for seamless enterprise user experiences.',
    tech: ['Frontend', 'React', 'Web'],
    type: 'work',
    linkedin: 'https://www.linkedin.com/posts/pavan-sharma-1645ab276_internshipcompletion-wictronixindia-frontenddeveloper-share-7353476167183572992-VppL',
  },
  {
    id: 'exp-4',
    role: 'Executive Member (Volunteer)',
    company: 'IEEE CUSB (Chandigarh University Student Branch)',
    period: '2023 - 2024',
    description: 'Actively contributed as an executive member in IEEE student branch. Participated in organizing technical events and initiatives, collaborating with team members to promote technical learning and innovation.',
    tech: ['Leadership', 'Event Management', 'Teamwork'],
    type: 'freelance',
    linkedin: 'https://www.linkedin.com/posts/pavan-sharma-1645ab276_ieee-chandigarhuniversity-manthan4-activity-7162159847805739008-M-vK',
  },
  {
    id: 'exp-5',
    role: 'Computer Science Undergraduate',
    company: 'Chandigarh University',
    period: 'Current',
    description: 'Pursuing B.Tech with a strong foundation in data structures, backend development, and intelligent systems.',
    tech: ['C++', 'Java', 'Python', 'DBMS', 'OOP'],
    type: 'education',
  }
];
