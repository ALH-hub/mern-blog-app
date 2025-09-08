import { Link } from 'react-router';
import Button from '../common/Button';

const Register = () => {
  return (
    <div className='  w-full max-h-screen px-8 pb-8 rounded-lg shadow-lg gap-16 bg-white'>
      <div className='flex justify-between items-center w-full'>
        <Link to={'/'}>
          <img className='w-70 h-42' src='/logo.png' alt='Logo image' />
        </Link>
        <h1 className='text-3xl font-bold text-[#1d4ed8]'>Registration</h1>
      </div>
      <div className='flex flex-col items-center justify-center  gap-8'>
        <form className='w-full flex flex-col gap-6'>
          <input
            required
            type='text'
            placeholder='Username with no spaces'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            required
            type='email'
            placeholder='Email'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            required
            type='password'
            placeholder='Password'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            required
            type='password'
            placeholder='Confirm Password'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <Button
            onClick={() => console.log('Login form submitted')}
            variant='primary'
            className='w-full mt-4 text-center'
          >
            <span className='w-full text-center'>Register</span>
          </Button>
        </form>
        <div className='mt-4 text-sm text-gray-600'>
          Already have an account?{' '}
          <Link to='/auth/login' className='text-blue-600 hover:underline'>
            login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
