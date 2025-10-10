import { Link } from 'react-router';
import Button from '../common/Button';
import useAuthStore from '../stores/authStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { Post } from '../types';
import postService from '../services/postService';

function Home() {
  const { isAuthenticated } = useAuthStore();
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'NexusBlog - Home';
    if (isAuthenticated) {
      navigate('/');
    }

    const fetchFeaturedPosts = async () => {
      try {
        setisLoading(true);
        const response = await postService.getPosts(1, 3);
        setFeaturedPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
      } finally {
        setisLoading(false);
      }

      // const mockPosts: Post[] = [
      //   {
      //     _id: '1',
      //     title: 'The Future of Technology',
      //     content: 'Full content of the post...',
      //     excerpt: 'A brief overview of upcoming tech trends.',
      //     category: 'Technology',
      //     author: { _id: 'a1', username: 'tech_guru' },
      //     coverImage:
      //       'https://media.istockphoto.com/id/1316372349/photo/shot-of-a-team-of-young-businesspeople-using-a-laptop-during-a-late-night-meeting-in-a-modern.jpg?s=1024x1024&w=is&k=20&c=vztaIB-e8bsHk6DFUpOWC_IykTIxqzqV77ZokInklGk=',
      //     createdAt: new Date().toISOString(),
      //     readingTime: 5,
      //   },
      //   {
      //     _id: '2',
      //     title: 'Healthy Living Tips',
      //     content: 'Full content of the post...',
      //     excerpt: 'Simple tips for a healthier lifestyle.',
      //     category: 'Health and Wellness',
      //     author: { _id: 'a2', username: 'health_expert' },
      //     coverImage:
      //       'https://media.istockphoto.com/id/1316372349/photo/shot-of-a-team-of-young-businesspeople-using-a-laptop-during-a-late-night-meeting-in-a-modern.jpg?s=1024x1024&w=is&k=20&c=vztaIB-e8bsHk6DFUpOWC_IykTIxqzqV77ZokInklGk=',
      //     createdAt: new Date().toISOString(),
      //     readingTime: 4,
      //   },
      // ];
    };

    fetchFeaturedPosts();
  }, [isAuthenticated, navigate]);

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
          {isAuthenticated ? (
            <Link to='/createpost'>
              <Button variant='primary'>
                <i className='fas fa-plus'></i>
                <span>Create Post</span>
              </Button>
            </Link>
          ) : (
            <Link to='/auth/login'>
              <Button variant='primary'>
                <i className='fas fa-sign-in-alt'></i>
                <span>Get Started</span>
              </Button>
            </Link>
          )}
          <Link to='/discover'>
            <Button variant='outline'>
              <i className='fas fa-compass'></i>
              <span>Explore Content</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className=' px-2 py-8 mt-10 flex justify-center flex-col align-items  w-full max-w-6xl'>
        <h2 className='text-4xl font-semibold text-left tracking-tighter'>
          Featured Articles
        </h2>
        <hr className='w-16 border-2 border-[#544cdb]' />
        <div className=' w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-20'>
          {isLoading ? (
            <p className='text-gray-600'>Loading...</p>
          ) : (
            featuredPosts.map((post) => (
              <article
                key={post._id}
                className='hover:shadow-lg rounded bg-white overflow-hidden group cursor-pointer flex flex-col'
                onClick={() => navigate(`/post/${post._id}`)}
              >
                {/* Post Image */}
                {post.coverImage && (
                  <div className='overflow-hidden relative h-48'>
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className='w-full h-full object-cover rounded-t group-hover:scale-105 transition-transform duration-500 ease-out'
                    />
                  </div>
                )}

                {/* Post Category and Reading Time */}
                <div className='p-4 flex gap-4 text-sm text-gray-600'>
                  <span className='bg-[#544cdb] text-white px-2 py-1 rounded text-xs'>
                    {post.category}
                  </span>
                  <span className='flex items-center gap-1'>
                    <i className='fas fa-clock'></i>
                    {post.readingTime} min read
                  </span>
                </div>

                {/* Post Title and Excerpt */}
                <div className='p-4 flex flex-col gap-3 flex-grow'>
                  <h3 className='text-xl font-semibold line-clamp-2 group-hover:text-[#544cdb] transition-colors'>
                    {post.title}
                  </h3>
                  <p className='text-gray-600 line-clamp-3'>{post.excerpt}</p>
                </div>

                {/* Post Author and Date */}
                <div className='flex p-4 justify-between items-center border-t border-gray-100'>
                  <div className='flex items-center gap-3'>
                    {/* <img
                    src={
                      post.author.avatar ||
                      'https://via.placeholder.com/40x40'
                    }
                    alt={post.author.username}
                    className='w-10 h-10 object-cover rounded-full'
                  /> */}
                    <span className='text-gray-700 font-medium'>
                      {post.author.username}
                    </span>
                  </div>
                  <span className='text-sm text-gray-500'>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </article>
            ))
          )}
          {isLoading === false && featuredPosts.length === 0 && (
            <p className='text-gray-600'>No featured posts available.</p>
          )}
        </div>
      </div>
      <div className=' mt-10 px-2 py-8 flex justify-center flex-col align-items  w-full max-w-6xl'>
        <h3 className='text-4xl font-semibold text-left tracking-tighter'>
          Explore Categories
        </h3>
        <hr className='w-16 border-2 border-[#544cdb]' />
        <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-8 mt-20'>
          <div className='bg-white p-4 rounded-lg flex flex-col items-center gap-4 hover:shadow-lg cursor-pointer'>
            <i className='fas fa-laptop-code text-5xl text-[#544cdb] '></i>
            <h3 className='text-xl font-semibold'>Technology</h3>
            <span className='text-gray-600 tracking-tighter text-sm'>
              article numbers
            </span>
          </div>
          <div className='bg-white p-4 rounded-lg flex flex-col items-center gap-4 hover:shadow-lg cursor-pointer'>
            <i className='fas fa-heartbeat text-5xl text-[#544cdb]'></i>
            <h3 className='text-xl font-semibold'>Health and Wellness</h3>
            <span className='text-gray-600 tracking-tighter text-sm'>
              article numbers
            </span>
          </div>
          <div className='bg-white p-4 rounded-lg flex flex-col items-center gap-4 hover:shadow-lg cursor-pointer'>
            <i className='fas fa-globe text-5xl text-[#544cdb]'></i>
            <h3 className='text-xl font-semibold'>Lifestyle</h3>
            <span className='text-gray-600 tracking-tighter text-sm'>
              article numbers
            </span>
          </div>
          <div className='bg-white p-4 rounded-lg flex flex-col items-center gap-4 hover:shadow-lg cursor-pointer'>
            <i className='fas fa-briefcase text-5xl text-[#544cdb]'></i>
            <h3 className='text-xl font-semibold'>Business</h3>
            <span className='text-gray-600 tracking-tighter text-sm'>
              article numbers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
