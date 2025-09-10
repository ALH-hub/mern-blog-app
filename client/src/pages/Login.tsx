import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuthStore from '../stores/authStore.js';
import Button from '../common/Button.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/'); // Redirect to home on success
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error occured');
      }
    }
  };

  return (
    <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-[#544cdb]'>Welcome Back</h1>
        <p className='text-gray-600 dark:text-gray-400 mt-2'>
          Sign in to your account
        </p>
      </div>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium mb-2'>
            Email Address
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#544cdb] focus:border-transparent dark:bg-gray-700 dark:border-gray-600'
            placeholder='Enter your email'
            required
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium mb-2'>
            Password
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#544cdb] focus:border-transparent dark:bg-gray-700 dark:border-gray-600'
            placeholder='Enter your password'
            required
          />
        </div>

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? (
            <>
              <i className='fas fa-spinner fa-spin mr-2'></i>
              Signing in...
            </>
          ) : (
            <>
              <i className='fas fa-sign-in-alt mr-2'></i>
              Sign In
            </>
          )}
        </Button>
      </form>

      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Don't have an account?{' '}
          <Link
            to='/auth/register'
            className='text-[#544cdb] hover:underline font-medium'
          >
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
