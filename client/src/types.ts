export interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
  };
  coverImage?: string;
  createdAt: string;
  readingTime: number;
}
