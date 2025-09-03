import Button from '../common/Button';

function Home() {
  return (
    <div className='flex flex-col items-center justify-center pt-32'>
      <div className='p-6 flex items-center justify-center flex-col gap-10 w-full'>
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
      <div className=' px-2 py-8 mt-6 flex justify-center align-items  w-full max-w-6xl'>
        <div>
          <h2 className='text-4xl font-bold text-left tracking-tighter'>
            Featured Articles
          </h2>
          <hr className='w-16 border-2 border-[#544cdb]' />
          <div className=' w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-4'>
            <div className='border rounded border-gray-300 rounded bg-white overflow-hidden group cursor-pointer flex flex-col gap-2'>
              <div className='overflow-hidden relative h-48'>
                <img
                  src='https://media.istockphoto.com/id/1316372349/photo/shot-of-a-team-of-young-businesspeople-using-a-laptop-during-a-late-night-meeting-in-a-modern.jpg?s=1024x1024&w=is&k=20&c=vztaIB-e8bsHk6DFUpOWC_IykTIxqzqV77ZokInklGk='
                  alt=''
                  className='w-full h-full object-cover rounded-t group-hover:scale-105 transition-transform duration-500 ease-out'
                />
              </div>
              <div className='p-2 flex gap-4'>
                <span>category here</span>
                <span>Reading time</span>
              </div>
              <div className='p-2 flex flex-col gap-2'>
                <h3 className='text-xl font-semibold'>
                  Article Title here and its incredibly long
                </h3>
                <p className='text-gray-600'>
                  Brief description of the article. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Laudantium, sapiente!
                </p>
              </div>
              <div className='flex p-2 justify-between items-center gap-2'>
                <div className='flex items-center gap-2 '>
                  <img
                    src='https://media.istockphoto.com/id/1316372349/photo/shot-of-a-team-of-young-businesspeople-using-a-laptop-during-a-late-night-meeting-in-a-modern.jpg?s=1024x1024&w=is&k=20&c=vztaIB-e8bsHk6DFUpOWC_IykTIxqzqV77ZokInklGk='
                    alt=''
                    className='w-12 h-12 object-cover rounded-full'
                  />
                  <span className='text-gray-600'>Author Name</span>
                </div>
                <span>date published</span>
              </div>
            </div>
            <div className='border rounded border-gray-300 rounded bg-white overflow-hidden group cursor-pointer flex flex-col gap-2'>
              <div className='overflow-hidden relative h-48'>
                <img
                  src='https://media.istockphoto.com/id/1316372349/photo/shot-of-a-team-of-young-businesspeople-using-a-laptop-during-a-late-night-meeting-in-a-modern.jpg?s=1024x1024&w=is&k=20&c=vztaIB-e8bsHk6DFUpOWC_IykTIxqzqV77ZokInklGk='
                  alt=''
                  className='w-full h-full object-cover rounded-t group-hover:scale-105 transition-transform duration-500 ease-out'
                />
              </div>
              <div className='p-2 flex gap-4'>
                <span>category here</span>
                <span>Reading time</span>
              </div>
              <div className='p-2 flex flex-col gap-2'>
                <h3 className='text-xl font-semibold'>
                  Article Title here and its incredibly long
                </h3>
                <p className='text-gray-600'>
                  Brief description of the article. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Laudantium, sapiente!
                </p>
              </div>
              <div className='flex p-2 justify-between items-center gap-2'>
                <div className='flex items-center gap-2 '>
                  <img
                    src='https://media.istockphoto.com/id/1316372349/photo/shot-of-a-team-of-young-businesspeople-using-a-laptop-during-a-late-night-meeting-in-a-modern.jpg?s=1024x1024&w=is&k=20&c=vztaIB-e8bsHk6DFUpOWC_IykTIxqzqV77ZokInklGk='
                    alt=''
                    className='w-12 h-12 object-cover rounded-full'
                  />
                  <span className='text-gray-600'>Author Name</span>
                </div>
                <span>date published</span>
              </div>
            </div>
            <div className='border rounded border-gray-300 rounded bg-white overflow-hidden group cursor-pointer flex flex-col gap-2'>
              <div className='overflow-hidden relative h-48'>
                <img
                  src='https://media.istockphoto.com/id/1316372349/photo/shot-of-a-team-of-young-businesspeople-using-a-laptop-during-a-late-night-meeting-in-a-modern.jpg?s=1024x1024&w=is&k=20&c=vztaIB-e8bsHk6DFUpOWC_IykTIxqzqV77ZokInklGk='
                  alt=''
                  className='w-full h-full object-cover rounded-t group-hover:scale-105 transition-transform duration-500 ease-out'
                />
              </div>
              <div className='p-2 flex gap-4'>
                <span>category here</span>
                <span>Reading time</span>
              </div>
              <div className='p-2 flex flex-col gap-2'>
                <h3 className='text-xl font-semibold'>
                  Article Title here and its incredibly long
                </h3>
                <p className='text-gray-600'>
                  Brief description of the article. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Laudantium, sapiente!
                </p>
              </div>
              <div className='flex p-2 justify-between items-center gap-2'>
                <div className='flex items-center gap-2 '>
                  <img
                    src='https://media.istockphoto.com/id/1316372349/photo/shot-of-a-team-of-young-businesspeople-using-a-laptop-during-a-late-night-meeting-in-a-modern.jpg?s=1024x1024&w=is&k=20&c=vztaIB-e8bsHk6DFUpOWC_IykTIxqzqV77ZokInklGk='
                    alt=''
                    className='w-12 h-12 object-cover rounded-full'
                  />
                  <span className='text-gray-600'>Author Name</span>
                </div>
                <span>date published</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
