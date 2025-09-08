import useThemeStore from '../stores/themeStore';

const Footer = () => {
  const { isDarkMode } = useThemeStore();
  return (
    <div
      className={`bg-gray-800 w-full flex flex-col justify-center items-center py-8 mt-16 ${
        isDarkMode ? 'bg-white text-gray-800 ' : 'bg-gray-800 text-white '
      }`}
    >
      {/* <div className='w-full max-w-6xl flex justify-center items-center p-4 gap-4'>
        <div>
          <img src='icon.png' alt='image here' className='h-20 w-20' />
          <p>
            A modern platform for writers and readers to connect, share ideas,
            and explore new perspectives.
          </p>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ducimus
          quos excepturi, blanditiis nesciunt doloribus.
        </div>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio illum
          alias non quos odit reprehenderit!{' '}
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          necessitatibus odit, sint possimus blanditiis at.
        </div>
      </div> */}
      <p className='text-center'>© 2023 NexusBlog. All rights reserved.</p>
    </div>
  );
};

export default Footer;
