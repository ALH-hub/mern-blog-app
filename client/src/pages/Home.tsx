import Button from '../common/Button';

function Home() {
  return (
    <div className='flex flex-col items-center justify-center pt-10'>
      <div className='p-6 flex items-center justify-center flex-col gap-10 border border-black w-full'>
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
      <div className='w-[calc(100%-theme(spacing.31))] px-2 mt-6 border border-black flex justify-center align-items flex-col gap-4 '>
        <h2 className='text-4xl font-bold text-left'>Featured Articles</h2>
        <hr className='w-16 border-2 border-[#544cdb]' />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
          <div className='border border-gray-300 p-4 rounded'>
            <h3 className='text-xl font-semibold'>Article Title 1</h3>
            <p className='text-gray-600'>Brief description of the article.</p>
          </div>
          <div className='border border-gray-300 p-4 rounded'>
            <h3 className='text-xl font-semibold'>Article Title 2</h3>
            <p className='text-gray-600'>Brief description of the article.</p>
          </div>
          <div className='border border-gray-300 p-4 rounded'>
            <h3 className='text-xl font-semibold'>Article Title 3</h3>
            <p className='text-gray-600'>Brief description of the article.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
