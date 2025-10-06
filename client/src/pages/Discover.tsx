import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router';
import type { PostQuery } from '../services/postService';
import postService from '../services/postService';

interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
  };
  coverImage?: string;
  createdAt: string;
  readingTime: number;
}

const categories = [
  'All',
  'Technology',
  'Health and Wellness',
  'Lifestyle',
  'Business',
  'Travel',
  'Food',
  'Education',
];

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();

  const getQueryFromURL = (): PostQuery => ({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    category: searchParams.get('category') || 'All',
    search: searchParams.get('search') || '',
    sort:
      (searchParams.get('sort') as 'newest' | 'oldest' | 'title') || 'newest',
    author: searchParams.get('author') || '',
  });

  const currentQuery = getQueryFromURL();

  const updateURL = (newQuery: Partial<PostQuery>) => {
    const updatedQuery = { ...currentQuery, ...newQuery };

    const params = new URLSearchParams();
    Object.entries(updatedQuery).forEach(([key, value]) => {
      if (value && value !== '' && value !== null) {
        params.set(key, String(value));
      }
    });
    setSearchParams(params);
  };

  const handleCategoryFilter = (category: string) => {
    updateURL({ category: category === 'All' ? '' : category, page: 1 });
  };

  const handleSortChange = (sort: 'newest' | 'oldest' | 'title') => {
    setSortBy(sort);
    updateURL({ sort, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateURL({ page });
  };

  const handleSearch = (searchTerm: string) => {
    updateURL({ search: searchTerm, page: 1 });
  };

  useEffect(() => {
    document.title = 'NexusBlog - Discover';

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await postService.searchPosts(currentQuery);
        setPosts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='pt-24 pb-10 min-h-216'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold tracking-tighter mb-4'>
            Discover{' '}
            <span className='bg-gradient-to-r from-[#544cdb] via-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Stories
            </span>
          </h1>
          <p className='text-xl text-gray-600'>
            Explore our collection of articles across various topics
          </p>
        </div>
        {/* Search and Filters */}
        <div className='mb-8 space-y-6'>
          {/* Search Bar */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <i className='fas fa-search text-gray-400'></i>
            </div>
            <input
              type='text'
              placeholder='Search articles by title, content, or author... and press Enter'
              defaultValue={currentQuery.search || ''}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch((e.target as HTMLInputElement).value);
                }
              }}
              className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cdb] focus:border-transparent outline-none'
            />
          </div>

          {/* Filters */}
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
            {/* Category Filters */}
            <div className='flex flex-wrap gap-2'>
              {categories.map((category) => (
                <option
                  key={category}
                  defaultValue={currentQuery.category || 'All'}
                  onClick={(e) => handleCategoryFilter(e.currentTarget.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    currentQuery.category === category
                      ? 'bg-[#544cdb] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </option>
              ))}
            </div>

            {/* Sort Options */}
            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-600'>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  handleSortChange(
                    e.target.value as 'newest' | 'oldest' | 'title',
                  )
                }
                className='px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#544cdb] focus:border-transparent outline-none'
              >
                <option value='newest'>Newest First</option>
                <option value='oldest'>Oldest First</option>
                <option value='title'>Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className='text-gray-600'>
            {loading ? 'Loading...' : `${posts.length} articles found`}
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#544cdb]'></div>
          </div>
        ) : posts.length === 0 ? (
          <div className='text-center py-20'>
            <i className='fas fa-search text-6xl text-gray-300 mb-4'></i>
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>
              No articles found
            </h3>
            <p className='text-gray-500'>
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {posts.map((post) => (
              <article
                key={post._id}
                className='hover:shadow-lg rounded-lg bg-white overflow-hidden group cursor-pointer flex flex-col transition-shadow duration-300'
                onClick={() => navigate(`/post/${post._id}`)}
              >
                {/* Post Image */}
                <div className='overflow-hidden relative h-48'>
                  <img
                    src={
                      post.coverImage || 'https://via.placeholder.com/400x200'
                    }
                    alt={post.title}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out'
                  />
                </div>

                {/* Post Meta */}
                <div className='p-4 flex gap-4 text-sm text-gray-600'>
                  <span className='bg-[#544cdb] text-white px-2 py-1 rounded text-xs'>
                    {post.category}
                  </span>
                  <span className='flex items-center gap-1'>
                    <i className='fas fa-clock'></i>
                    {post.readingTime} min read
                  </span>
                </div>

                {/* Post Content */}
                <div className='p-4 flex flex-col gap-3 flex-grow'>
                  <h3 className='text-xl font-semibold line-clamp-2 group-hover:text-[#544cdb] transition-colors'>
                    {post.title}
                  </h3>
                  <p className='text-gray-600 line-clamp-3'>{post.excerpt}</p>
                </div>

                {/* Post Footer */}
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
                    {formatDate(post.createdAt)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {posts.length > 0 && (
          <div className='text-center mt-12'>
            <Button
              variant='outline'
              onClick={() =>
                handlePageChange(currentQuery.page ? currentQuery.page + 1 : 1)
              }
              disabled={currentQuery.page ? currentQuery.page <= 1 : true}
            >
              <i className='fas fa-plus'></i>
              <span>Load More Articles</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
