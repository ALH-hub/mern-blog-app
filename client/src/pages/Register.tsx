import { Link, useNavigate } from 'react-router';
import Button from '../common/Button';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../stores/authStore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');

  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('')

    try {
      await(register({}))
    }
  }

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
        <h1 className='text-3xl font-bold text-[#1d4ed8]'>Registration</h1>
      </div>
      <div className='flex flex-col items-center justify-center  gap-8'>
        <form className='w-full flex flex-col gap-6'>
          <input
            id='username'
            value={username}
            type='text'
            placeholder='Username with no spaces'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => {
              setUsername(e.target.value.replace(' ', '_'));
            }}
            required
          />
          <input
            id='email'
            value={email}
            type='email'
            placeholder='Email'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id='password'
            type='password'
            placeholder='Password'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            id='vpassword'
            type='password'
            placeholder='Confirm Password'
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (password !== verifyPassword) {
                target.setCustomValidity('Password confirmation failed');
              }
            }}
            onChange={(e) => setVerifyPassword(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
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
