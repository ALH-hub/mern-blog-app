import { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Button from '../common/Button';
import { Link } from 'react-router';

const CreatePost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
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
  }, [content]);

  return (
    <div className='pt-32 m-auto min-h-screen max-w-4xl px-4'>
      <h1 className='text-3xl font-bold mb-6'>Create Post</h1>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Post Title'
          className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
      <Link to='/'>
        <Button variant='primary'>
          <i className='fas fa-paper-plane'></i>
          <span>Publish Post</span>
        </Button>
      </Link>
    </div>
  );
};

export default CreatePost;
