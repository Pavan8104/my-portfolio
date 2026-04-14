export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
  content: string;
  related?: string[];
}

export const blogPosts: BlogPost[] = [];
