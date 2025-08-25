import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type themeStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;
};

const useThemeStore = create<themeStore>()(
  persist(
    (set, get) => ({
      isDarkMode: false as boolean,
      toggleDarkMode: () => {
        const newMode = !get().isDarkMode;
        set({ isDarkMode: newMode });
        console.log('just set the new theme');

        const html = document.documentElement;
        if (newMode) {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      },
      setDarkMode: (dark: boolean) => {
        set({ isDarkMode: dark });

        const html = document.documentElement;
        if (dark) {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      },
    }),
    {
      name: 'theme-storage',
    },
  ),
);

export default useThemeStore;
