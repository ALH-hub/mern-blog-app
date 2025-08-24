import Button from '../common/Button';
import { useEffect, useState } from 'react';

function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log('local storage set to dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log('local storage set to light');
    }
  }, [isDarkMode]);

  return (
    <div
      className={`bg-gray-800 text-white p-4 flex items-center justify-between fixed w-full`}
    >
      <div className='flex items-center'>
        <img src='icon.png' alt='NexusBlog Icon' className='h-10' />
        <h1
          className={`text-lg font-bold ${
            isDarkMode ? 'text-[#4a42c4]' : 'text-white'
          }`}
        >
          NexusBlog
        </h1>
      </div>
      <div className='flex items-center gap-3'>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className='ml-4 p-2 rounded-full transparent text-white'
        >
          <i
            className={`fas ${
              isDarkMode
                ? 'fa-sun text-yellow-500 text-2xl'
                : 'fa-moon text-gray-500 text-2xl'
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
          <span className=''>Sign Up</span>
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
