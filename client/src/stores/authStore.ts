import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api';
import Cookies from 'js-cookie';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/login', { email, password });
          const { token, user } = response.data.data;

          Cookies.set('token', token, { expires: 7 });
          set({ user, isLoading: false, isAuthenticated: true });
        } catch (error: unknown) {
          set({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
          console.error('Login error:', error);
          if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error
          ) {
            const err = error as { response?: { data?: { message?: string } } };
            throw new Error(err.response?.data?.message || 'Login failed');
          }
          throw new Error('Login failed');
        }
      },
      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/register', userData);

          const { token, user } = response.data.data;

          Cookies.set('token', token, { expires: 7 });
          set({ user, isLoading: false, isAuthenticated: true });
        } catch (error: unknown) {
          set({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
          console.error('Registration error:', error);
          if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error
          ) {
            const err = error as { response?: { data?: { message?: string } } };
            throw new Error(
              err.response?.data?.message || 'Registration failed',
            );
          }
          throw new Error('Registration failed');
        }
      },
      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (error: unknown) {
          console.error('Logout error:', error);
        } finally {
          Cookies.remove('token');
          localStorage.removeItem('user');
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },

      checkAuth: async () => {
        const token = Cookies.get('token');
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        try {
          const response = await api.get('/auth/me');
          const user = response.data.data;

          set({
            user,
            isAuthenticated: true,
          });
        } catch (error: unknown) {
          Cookies.remove('token');
          localStorage.removeItem('user');
          set({
            user: null,
            isAuthenticated: false,
          });

          if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error
          ) {
            const err = error as { response?: { data?: { message?: string } } };
            throw new Error(err.response?.data?.message || 'Check auth failed');
          }
          throw new Error('Check auth failed');
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
