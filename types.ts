
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export enum NavigationTab {
  HOME = 'home',
  BLOG = 'blog',
  ABOUT = 'about',
  POST = 'post'
}
