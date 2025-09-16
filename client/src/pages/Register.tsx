import { Link, useNavigate } from 'react-router';
import Button from '../common/Button';
import React, { useState } from 'react';
import useAuthStore from '../stores/authStore';
import Popup from '../components/Popup';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await register(userData);
      navigate('/');
      setShowPopup(true);
      await new Promise((resolve) => setTimeout(resolve, 2500));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        setError(error.message);
        setShowPopup(true);
      } else {
        setError('Error trying to register');
        setShowPopup(true);
      }
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //   }
  // }, [error]);

  return (
    <div className='  w-full max-h-screen px-8 pb-8 rounded-lg shadow-lg gap-16 bg-white'>
      <div className='flex justify-between items-center w-full'>
        <Link to={'/'}>
          <img className='w-70 h-42' src='/logo.png' alt='Logo image' />
        </Link>
        <h1 className='text-3xl font-bold text-[#1d4ed8]'>Registration</h1>
      </div>
      <div className='flex flex-col items-center justify-center  gap-8'>
        <form className='w-full flex flex-col gap-6' onSubmit={handleSubmit}>
          <input
            id='username'
            value={userData.username}
            type='text'
            placeholder='Username with no spaces'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => {
              setUserData({
                ...userData,
                username: e.target.value.replace(' ', '_'),
              });
            }}
            required
          />
          <input
            id='email'
            value={userData.email}
            type='email'
            placeholder='Email'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            required
          />
          <input
            id='password'
            type='password'
            placeholder='Password'
            value={userData.password}
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
          />
          <input
            id='vpassword'
            type='password'
            placeholder='Confirm Password'
            value={verifyPassword}
            onInput={(e) => {
              console.log(verifyPassword === userData.password);
              const target = e.target as HTMLInputElement;
              console.log(userData.password, target.value);
              if (userData.password !== target.value) {
                // target.setCustomValidity('Passwords do not match');
              }
            }}
            onChange={(e) => setVerifyPassword(e.target.value)}
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
              </div>
            ) : (
              <div className='mx-auto'>
                <i className='fas fa-user-plus mr-2 text-white'></i>
                <span>Register</span>
              </div>
            )}
          </Button>
        </form>
        <div className='mt-4 text-sm text-gray-600'>
          Already have an account?{' '}
          <Link to='/auth/login' className='text-blue-600 hover:underline'>
            login here
          </Link>
        </div>
      </div>
      {showPopup && error && (
        <Popup
          message={error}
          onClose={() => setShowPopup(false)}
          duration={2000}
        />
      )}
      {showPopup && !error && (
        <Popup
          message={'Registered successfully!'}
          type='success'
          onClose={() => setShowPopup(false)}
          duration={2000}
        />
      )}
    </div>
  );
};

export default Register;
