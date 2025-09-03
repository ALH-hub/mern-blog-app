import Button from '../common/Button';
import useThemeStore from '../stores/themeStore';

function NavBar() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <div
      className={` text-white py-4 px-6 flex items-center justify-center gap-16 w-full border-b-4 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className='flex items-center'>
        <img src='icon.png' alt='NexusBlog Icon' className='h-12' />
        <h1 className={`text-3xl font-bold text-[#544cdb]`}>NexusBlog</h1>
      </div>
      <div
        className={`flex gap-6 text-lg ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        <button>Home</button>
        <button>Discover</button>
        <button>Categories</button>
        <button>About</button>
        <button>Contact</button>
      </div>
      <div className='flex items-center gap-3'>
        <button
          onClick={toggleDarkMode}
          className='p-2 rounded-full transparent text-white'
        >
          <i
            className={`fas ${
              isDarkMode
                ? 'fa-sun text-yellow-400 text-2xl'
                : 'fa-moon text-gray-500 text-2xl'
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
