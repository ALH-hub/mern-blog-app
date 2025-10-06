import api from '../utils/api';

export interface PostData {
  title: string;
  content: string;
  category: string;
  coverImage?: string;
}

const postService = {
  createPost: (data: PostData) => api.post('/posts', data),
  getPosts: (page: number, limit: number) =>
    api.get(`/posts?page=${page}&limit=${limit}`),
  getPostById: (id: string) => api.get(`/posts/${id}`),
  updatePost: (id: string, data: Partial<PostData>) =>
    api.put(`/posts/${id}`, data),
  deletePost: (id: string) => api.delete(`/posts/${id}`),
};

export default postService;
