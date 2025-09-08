import { Link } from 'react-router';
import Button from '../common/Button';
import useThemeStore from '../stores/themeStore';
import { useNavigate } from 'react-router';

function NavBar() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div
      className={` text-white py-4 px-6 flex items-center justify-center gap-16 w-full fixed  shadow-sm z-1 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <Link to='/' className='flex items-center'>
        <img src='icon.png' alt='NexusBlog Icon' className='h-12' />
        <h1 className={`text-3xl font-bold text-[#544cdb]`}>NexusBlog</h1>
      </Link>
      <div
        className={`flex gap-6 text-lg font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        <Link to='/'>Home</Link>
        <Link to='/discover'>Discover</Link>
        <Link to='/categories'>Categories</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
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
        <Button onClick={() => navigate('/auth/login')} variant='outline'>
          <i className='fas fa-right-to-bracket'></i>
          <span>Login</span>
        </Button>
        <Button onClick={() => navigate('/auth/register')} variant='primary'>
          <i className='fas fa-user-plus'></i>
          <span>Sign Up</span>
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
