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
      maxWidth: 900,
      minHeight: 700,
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
    <div className='pt-32 mx-auto max-w-6xl px-2 sm:px-6 flex flex-col lg:flex-row gap-4 z-0 justify-center pb-10'>
      {/* Editor and Title */}
      <div className='flex-4 w-full lg:max-w-[800px]'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Create Post</h1>
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
      {/* Sidebar */}
      <div className='flex flex-col flex-1 w-full lg:w-auto gap-4'>
        <h2 className='text-xl sm:text-2xl font-semibold mt-10 mb-4 tracking-tighter'>
          Select Category
        </h2>
        <select className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <option value='technology'>Technology</option>
          <option value='lifestyle'>Lifestyle</option>
          <option value='travel'>Travel</option>
          <option value='food'>Food</option>
          <option value='education'>Education</option>
          <option value='health'>Health</option>
          <option value='finance'>Finance</option>
          <option value='entertainment'>Entertainment</option>
        </select>
        <h2 className='text-xl sm:text-2xl font-semibold mt-10 mb-4 tracking-tighter'>
          Publish
        </h2>
        <div className='text-sm text-gray-600'>
          Once you publish, your post will be live on the platform.
        </div>
        <Link to='/'>
          <Button variant='primary'>
            <i className='fas fa-paper-plane'></i>
            <span>Publish Post</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreatePost;
