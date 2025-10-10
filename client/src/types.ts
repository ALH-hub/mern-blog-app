export interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  coverImage?: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
    bio?: string;
  };
  createdAt: string;
  updatedAt: string;
  readingTime: number;
  likes: number;
  views: number;
}
