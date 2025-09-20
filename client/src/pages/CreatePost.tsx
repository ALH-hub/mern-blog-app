import { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Button from '../common/Button';
import { Link } from 'react-router';

const CreatePost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const config = useMemo(
    () => ({
      readonly: false,
      minHeight: 500,
      placeholder: 'Start typing your post content here...',
      uploader: {
        insertImageAsBase64URI: true,
      },
      buttons: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'ul',
        'ol',
        '|',
        'outdent',
        'indent',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'image',
        'video',
        'link',
        '|',
        'align',
        'undo',
        'redo',
        '|',
        'hr',
        'eraser',
        'copyformat',
        '|',
        'fullsize',
        'source',
      ],
    }),
    [],
  );

  useEffect(() => {
    // This will log the content whenever it changes
    console.log('Editor content:', content);
    console.log('Title:', title);
  }, [content, title]);

  return (
    <div className='pt-32 mx-auto max-w-7xl px-7 flex gap-4 z-0 justify-center pb-10'>
      <div className='flex-3'>
        <h1 className='text-3xl font-bold mb-6'>Create Post</h1>
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Post Title'
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </div>
      <div>
        <div className='flex-1 gap-4 flex flex-col'>
          <h2 className='text-2xl font-semibold mt-10 mb-4 tracking-tighter'>
            Select Category
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-2 gap-2'>
            {[
              'Technology',
              'Health',
              'Travel',
              'Food',
              'Lifestyle',
              'Finance',
              'Education',
              'Entertainment',
            ].map((category) => (
              <div>
                <input
                  key={category}
                  value={category}
                  id={category}
                  type='radio'
                  className='px-4 mr-2 py-2 border border-gray-300 rounded-lg hover:bg-[#544cdb] hover:text-white transition'
                />
                {category}
              </div>
            ))}
          </div>
          <Link to='/'>
            <Button variant='primary'>
              <i className='fas fa-paper-plane'></i>
              <span>Publish Post</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
