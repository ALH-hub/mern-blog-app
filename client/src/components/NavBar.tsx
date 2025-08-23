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
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
