import Button from '../common/Button';
import useThemeStore from '../stores/themeStore';

function NavBar() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <div
      className={`bg-gray-800 text-white p-4 flex items-center justify-between fixed w-full`}
    >
      <div className='flex items-center'>
        <img src='icon.png' alt='NexusBlog Icon' className='h-10' />
        <h1
          className={`text-lg font-bold ${
            isDarkMode ? 'dark:text-blue-500' : 'text-white'
          }`}
        >
          NexusBlog
        </h1>
      </div>
      <div></div>
      <div className='flex items-center gap-3'>
        <button
          onClick={toggleDarkMode}
          className='ml-4 p-2 rounded-full transparent text-white'
        >
          <i
            className={`fas ${
              isDarkMode
                ? 'fa-sun text-yellow-400 text-2xl'
                : 'fa-moon text-gray-400 text-2xl'
            }`}
          ></i>
        </button>
        <Button onClick={() => console.log('Login clicked')} variant='outline'>
          <i className='fas fa-right-to-bracket'></i>
          <span>Login</span>
        </Button>
        <Button
          onClick={() => console.log('Sign Up clicked')}
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
