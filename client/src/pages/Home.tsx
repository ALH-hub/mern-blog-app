import Button from '../common/Button';

function Home() {
  return (
    <div className='flex flex-col items-center justify-center pt-34 border-6 border-black'>
      <div className='p-6 flex items-center justify-center flex-col gap-10 '>
        <h1 className='text-[3.5rem] leading-none font-bold text-center tracking-tighter flex flex-col items-center justify-center bg-gradient-to-r from-[#544cdb] via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]'>
          Where Ideas Connect and <br /> Stories Unfold.
        </h1>
        <p className='text-xl text-center text-gray-500 tracking-tighter '>
          Discover, share, and engage with a community of passionate writers and
          readers
        </p>
        <div className='flex gap-2'>
          <Button onClick={() => {}}>
            <i className='fas fa-pencil-alt'></i>
            <span>Start Writing</span>
          </Button>
          <Button onClick={() => {}} variant='outline'>
            <i className='fas fa-compass'></i>
            <span>Explore Content</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
