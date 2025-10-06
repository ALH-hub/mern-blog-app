import api from '../utils/api';

export interface PostData {
  title: string;
  content: string;
  category: string;
  coverImage?: string;
}

export interface PostQuery {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: 'newest' | 'oldest' | 'title';
  author?: string;
}

const postService = {
  createPost: (data: PostData) => api.post('/posts', data),

  // Method 1: Manual query string building
  getPosts: (page: number, limit: number) =>
    api.get(`/posts?page=${page}&limit=${limit}`),

  // Method 3: Using axios params option (cleanest)
  searchPosts: (query: PostQuery) => api.get('/posts', { params: query }),

  getPostById: (id: string) => api.get(`/posts/${id}`),
  updatePost: (id: string, data: Partial<PostData>) =>
    api.put(`/posts/${id}`, data),
  deletePost: (id: string) => api.delete(`/posts/${id}`),

  // Category-specific queries
  getPostsByCategory: (category: string, page = 1, limit = 10) =>
    api.get('/posts', {
      params: { category, page, limit },
    }),

  // Search with multiple filters
  searchPostsAdvanced: (
    searchTerm: string,
    filters?: Omit<PostQuery, 'search'>,
  ) =>
    api.get('/posts', {
      params: {
        search: searchTerm,
        ...filters,
      },
    }),
};

export default postService;
