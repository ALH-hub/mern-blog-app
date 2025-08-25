// src/components/NavBar.tsx
import Button from '../common/Button';
import useThemeStore from '../stores/themeStore';

function NavBar() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <div className='bg-white dark:bg-gray-800 text-black dark:text-white p-4 flex items-center justify-between fixed w-full shadow-md'>
      <div className='flex items-center'>
        <img src='icon.png' alt='NexusBlog Icon' className='h-10' />
        <h1 className='text-lg font-bold text-blue-600 dark:text-blue-400'>
          NexusBlog
        </h1>
      </div>

      <div className='flex items-center gap-3'>
        <button
          onClick={toggleDarkMode}
          className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
        >
          <i
            className={`fas text-xl ${
              isDarkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-gray-600'
            }`}
          ></i>
        </button>

        <Button onClick={() => console.log('Login clicked')} variant='outline'>
          <i className='fas fa-right-to-bracket'></i>
          <span className='md:inline'>Login</span>
        </Button>

        <Button
          onClick={() => console.log('Sign Up clicked')}
          className='ml-2'
          variant='primary'
        >
          <i className='fas fa-user-plus'></i>
          <span>Sign Up</span>
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
