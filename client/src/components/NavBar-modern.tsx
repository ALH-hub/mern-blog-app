import Button from '../common/Button';

function NavBar() {
  return (
    <div className='bg-gray-800 text-white p-4 flex items-center justify-between fixed w-full'>
      <div className='flex items-center'>
        <img src='icon.png' alt='NexusBlog Icon' className='h-10' />
        <h1 className='text-lg font-bold'>NexusBlog</h1>
      </div>
      <div className='flex items-center'>
        <Button onClick={() => console.log('Login clicked')} variant='outline'>
          Login
        </Button>
        <Button
          onClick={() => console.log('Sign Up clicked')}
          className='ml-2'
          variant='primary'
        >
          {/* Modern SVG icon alternative */}
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
              clipRule='evenodd'
            />
            <path
              fillRule='evenodd'
              d='M13 7a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1V8a1 1 0 011-1z'
              clipRule='evenodd'
            />
          </svg>
          <span className='md:inline'>Sign Up</span>
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
