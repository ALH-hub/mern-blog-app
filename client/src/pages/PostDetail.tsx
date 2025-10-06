import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import Button from '../common/Button';
import useAuthStore from '../stores/authStore';
import postService from '../services/postService';

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  coverImage: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
    bio?: string;
  };
  createdAt: string;
  updatedAt: string;
  readingTime: number;
  likes: number;
  views: number;
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuthStore();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const response = await postService.getPostById(id!);
        setPost(response.data.data);
        console.log(response.data.data);

        // Mock data for development
        // setPost({
        //   _id: '1',
        //   title: 'Building Modern Web Applications with React and TypeScript',
        //   content: `
        //     <p>React and TypeScript have become the gold standard for building modern, scalable web applications. In this comprehensive guide, we'll explore how to leverage these powerful technologies to create robust applications that can grow with your business needs.</p>

        //     <h2>Why React and TypeScript?</h2>
        //     <p>React's component-based architecture provides excellent code reusability and maintainability, while TypeScript adds static type checking that catches errors during development rather than in production.</p>

        //     <h3>Key Benefits:</h3>
        //     <ul>
        //       <li><strong>Type Safety:</strong> Catch errors early in the development process</li>
        //       <li><strong>Better Developer Experience:</strong> Enhanced IDE support with autocomplete and refactoring</li>
        //       <li><strong>Scalability:</strong> Large codebases become more manageable</li>
        //       <li><strong>Team Productivity:</strong> Clear contracts between components</li>
        //     </ul>

        //     <h2>Getting Started</h2>
        //     <p>Setting up a new React TypeScript project is straightforward with modern tooling. Tools like Vite and Create React App provide excellent starter templates.</p>

        //     <pre><code>npm create vite@latest my-app -- --template react-ts</code></pre>

        //     <p>This command creates a new React application with TypeScript configured and ready to go. The template includes all the necessary configurations for a modern development workflow.</p>

        //     <h2>Best Practices</h2>
        //     <p>When working with React and TypeScript, following established patterns and best practices is crucial for long-term success.</p>
        //   `,
        //   excerpt:
        //     'Learn how to build modern, scalable web applications using React and TypeScript with best practices and real-world examples.',
        //   category: 'Technology',
        //   coverImage:
        //     'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        //   author: {
        //     _id: '1',
        //     name: 'Sarah Johnson',
        //     avatar:
        //       'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        //     bio: 'Senior Frontend Developer with 8+ years of experience in React ecosystem. Passionate about building scalable web applications.',
        //   },
        //   createdAt: '2024-01-15T10:00:00Z',
        //   updatedAt: '2024-01-15T10:00:00Z',
        //   readingTime: 8,
        //   likes: 156,
        //   views: 2341,
        //   tags: [
        //     'React',
        //     'TypeScript',
        //     'Frontend',
        //     'JavaScript',
        //     'Web Development',
        //   ],
        // });
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    fetchRelatedPosts();
  }, [id]);

  const fetchRelatedPosts = async () => {
    // Mock related posts
    setRelatedPosts([
      {
        _id: '2',
        title: 'Advanced React Patterns and Performance Optimization',
        content: '<p>Learn advanced React patterns for better performance.</p>',
        category: 'Technology',
        coverImage:
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        author: { _id: '2', username: 'Mike Chen', avatar: '', bio: '' },
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z',
        readingTime: 6,
        likes: 42,
        views: 500,
      },
      {
        _id: '3',
        title: 'State Management in Large React Applications',
        content: '<p>Explore state management solutions for React.</p>',
        category: 'Technology',
        coverImage:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        author: { _id: '3', username: 'Emily Davis', avatar: '', bio: '' },
        createdAt: '2024-01-08T10:00:00Z',
        updatedAt: '2024-01-08T10:00:00Z',
        readingTime: 10,
        likes: 35,
        views: 420,
      },
    ]);
  };

  const handleLike = () => {
    setLiked(!liked);
    // API call to like/unlike post
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className='pt-24 min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#544cdb]'></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='pt-24 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-600 mb-4'>
            Post not found
          </h1>
          <Link to='/discover'>
            <Button variant='primary'>Browse Posts</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='pt-24 pb-16 bg-gray-50 max-w-6xl mx-auto px-4'>
      {/* Hero Section */}
      <div className='relative h-96 bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden'>
        <img
          src={post.coverImage}
          alt={post.title}
          className='absolute inset-0 w-full h-full object-cover opacity-60'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
        <div className='relative max-w-4xl mx-auto px-4 h-full flex items-end pb-12'>
          <div className='text-white'>
            <div className='flex items-center gap-4 mb-4'>
              <span className='bg-[#544cdb] px-3 py-1 rounded-full text-sm font-medium'>
                {post.category}
              </span>
              <span className='flex items-center gap-1 text-sm'>
                <i className='fas fa-clock'></i>
                {post.readingTime} min read
              </span>
              <span className='flex items-center gap-1 text-sm'>
                <i className='fas fa-eye'></i>
                {post.views} views
              </span>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold leading-tight mb-4'>
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className='max-w-4xl mx-auto px-4 -mt-8 relative z-10'>
        {/* Author Info Card */}
        <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <img
                src={post.author.avatar || 'https://via.placeholder.com/60x60'}
                alt={post.author.username}
                className='w-15 h-15 rounded-full object-cover'
              />
              <div>
                <h3 className='font-semibold text-lg'>
                  {post.author.username}
                </h3>
                <p className='text-gray-600 text-sm mb-1'>
                  Published on {formatDate(post.createdAt)}
                </p>
                {post.author.bio && (
                  <p className='text-gray-600 text-sm'>{post.author.bio}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-3'>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  liked
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i
                  className={`fas fa-heart ${liked ? 'text-red-500' : ''}`}
                ></i>
                <span>
                  {post?.likes ? post.likes + (liked ? 1 : 0) : post.likes}
                </span>
              </button>

              <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors'>
                <i className='fas fa-share'></i>
                <span>Share</span>
              </button>

              {isAuthenticated && user?.id === post.author._id && (
                <Link to={`/edit-post/${post._id}`}>
                  <Button variant='outline'>
                    <i className='fas fa-edit'></i>
                    <span>Edit</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <article className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='p-8 md:p-12'>
            <div
              className='prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#544cdb] prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100'
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className='mt-16'>
            <h2 className='text-3xl font-bold tracking-tighter mb-8'>
              Related Articles
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  to={`/post/${relatedPost._id}`}
                  className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group'
                >
                  <div className='overflow-hidden h-48'>
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                  <div className='p-6'>
                    <div className='flex items-center gap-3 mb-3 text-sm text-gray-600'>
                      <span className='bg-[#544cdb] text-white px-2 py-1 rounded text-xs'>
                        {relatedPost.category}
                      </span>
                      <span className='flex items-center gap-1'>
                        <i className='fas fa-clock'></i>
                        {relatedPost.readingTime} min read
                      </span>
                    </div>
                    <h3 className='text-xl font-semibold mb-2 group-hover:text-[#544cdb] transition-colors'>
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className='mt-16 bg-gradient-to-r from-[#544cdb] to-purple-600 rounded-lg p-8 text-white text-center'>
          <h3 className='text-2xl font-bold mb-4'>Enjoyed this article?</h3>
          <p className='text-lg mb-6 text-purple-100'>
            Join our community of passionate writers and readers
          </p>
          <div className='flex gap-4 justify-center'>
            {!isAuthenticated ? (
              <>
                <Link to='/auth/register'>
                  <Button
                    variant='outline'
                    className='bg-white text-[#544cdb] border-white hover:bg-gray-100'
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to='/discover'>
                  <Button
                    variant='outline'
                    className='border-white text-white hover:bg-white/10'
                  >
                    Explore More
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to='/createpost'>
                  <Button
                    variant='outline'
                    className='bg-white text-[#544cdb] border-white hover:bg-gray-100'
                  >
                    Write Your Story
                  </Button>
                </Link>
                <Link to='/discover'>
                  <Button
                    variant='outline'
                    className='border-white text-white hover:bg-white/10'
                  >
                    Discover More
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
