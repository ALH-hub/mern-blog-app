import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className='flex items-center justify-center h-screen flex-col gap-4'>
      <h1 className='text-8xl font-bold'>
        <span className='text-red-500'>404</span> - Not Found!
      </h1>
      <p className='text-2xl text-center font-medium'>
        Waouh!!! You're such an explorer!!! <br /> You found a page that doesn't
        exist.
      </p>
      <div className='not-found-link'>
        <Link className='text-blue-500 hover:underline' to='/'>
          Go back to Home explorer!
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
