import useThemeStore from '../stores/themeStore';

const Footer = () => {
  const { isDarkMode } = useThemeStore();
  return (
    <div
      className={`bg-gray-800 py-4 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'
      }`}
    >
      <div></div>
      <p className='text-center'>© 2023 NexusBlog. All rights reserved.</p>
    </div>
  );
};

export default Footer;
