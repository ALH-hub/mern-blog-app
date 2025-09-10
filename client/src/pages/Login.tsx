import { Link, useNavigate } from 'react-router';
import Button from '../common/Button';
import React, { useState, useEffect } from 'react';
import useAuthStore from '../stores/authStore';

const Login = () => {
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
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error trying to login');
      }
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className='  w-full max-h-screen px-8 pb-8 rounded-lg shadow-lg gap-16 bg-white'>
      <div className='flex justify-between items-center w-full'>
        <Link to={'/'}>
          <img className='w-70 h-42' src='/logo.png' alt='Logo image' />
        </Link>
        <h1 className='text-3xl font-bold text-[#1d4ed8]'>Login</h1>
      </div>
      <div className='flex flex-col items-center justify-center  gap-8'>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6'>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
          <input
            id='password'
            type='password'
            value={password}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value.length < 8) {
                target.setCustomValidity(
                  'Password must be at least 8 characters long',
                );
              } else {
                target.setCustomValidity('');
              }
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder='Enter your password'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
          <Button
            type='submit'
            variant='primary'
            className='w-full mt-4 text-center items-center'
            disabled={isLoading}
          >
            {isLoading ? (
              <div className='mx-auto'>
                <i className='fas fa-spinner fa-spin mr-2 text-white'></i>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className='mx-auto'>
                <i className='fas fa-sign-in-alt mr-2 text-white'></i>
                <span>Login</span>
              </div>
            )}
          </Button>
        </form>
        <div className='mt-4 text-sm text-gray-600'>
          Don't have an account?{' '}
          <Link to='/auth/register' className='text-blue-600 hover:underline'>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
