export interface Achievement {
  id: string;
  category: string;
  title: string;
  description?: string;
  link?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    category: 'Research Papers',
    title: 'Fake News Detection Research Paper',
    link: 'https://www.linkedin.com/posts/pavan-sharma-1645ab276_mmcitre2024-machinelearning-fakenewsdetection-share-7206537889730428929-luRb'
  },
  {
    id: 'ach-2',
    category: 'Certifications',
    title: 'AWS Solution Architect Associate',
    link: 'https://www.linkedin.com/posts/pavan-sharma-1645ab276_aws-cloudcomputing-cloudnative-ugcPost-7444095353509023744-iqX4'
  },
  {
    id: 'ach-3',
    category: 'Certifications',
    title: 'Database and SQL for Data Science with Python',
    link: 'https://www.linkedin.com/posts/pavan-sharma-1645ab276_completion-certificate-for-databases-and-share-7426914086841470976-3PKY'
  },
  {
    id: 'ach-4',
    category: 'Achievements / Recognition',
    title: 'Letter of Recommendation (College)',
    link: 'https://www.linkedin.com/posts/pavan-sharma-1645ab276_grateful-mentorship-teamwork-ugcPost-7409477279925374977-zNfH'
  }
];
