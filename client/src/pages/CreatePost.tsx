import { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Button from '../common/Button.js';
import { Link } from 'react-router';
import api from '../utils/api.js';
import axios from 'axios';

const CreatePost = () => {
  const editor = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    coverImage: '',
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const config = useMemo(
    () => ({
      readonly: false,
      maxWidth: 900,
      minHeight: 700,
      placeholder: 'Start typing your post content here...',
      // uploader: {
      //   insertImageAsBase64URI: true,
      // },
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
        // 'image',
        // 'video',
        // 'link',
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

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be less than 10MB');
      return;
    }
    setUploadingImage(true);

    const UPLOAD_PRESET = 'umxptlvz';
    const CLOUD_NAME = 'dzsv3mhyd';
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', 'blog_post');

      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const imageUrl = data.secure_url;
        setPost({ ...post, coverImage: imageUrl });
        setImagePreview(imageUrl);
        console.log('Image uploaded successfully:', imageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      console.log((error as Error).message);
      // Fallback to local preview
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);
      setPost({ ...post, coverImage: localUrl });
    } finally {
      setUploadingImage(false);
    }

    // Uncomment below if you want to use local file upload
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('cloud_name', CLOUD_NAME);
    // UPLOAD_PRESET is used for Cloudinary upload presets
    // // formData.append('upload_preset', UPLOAD_PRESET);
    // formData.append('folder', 'your_folder_name'); // Optional: specify a folder in Cloudinary
    // formData.append('resource_type', 'image'); // Specify resource type as image
    // formData.append('public_id', `uploads/${file.name}`); // Optional: specify public ID for the image

    // const response = await fetch(CLOUDINARY_URL, {
    //   method: 'POST',
    //   body: formData,
    // });

    // if (!response.ok) {
    //   throw new Error('Image upload failed');
    // }

    // const data = await response.json();
    // const imageUrl = data.secure_url; // Use secure_url for HTTPS
    // setPost({ ...post, coverImage: imageUrl });
    // setImagePreview(imageUrl);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setPost({ ...post, coverImage: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePublish = () => {
    api
      .post('/posts', post)
      .then((response) => {
        console.log('Post published successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error publishing post:', error);
      });
    console.log('Publishing post:', post);
  };

  useEffect(() => {
    // This will log the content whenever it changes
    console.log('Editor content:', post.content);
    console.log('Title:', post.title);
    console.log('Category:', post.category);
  }, [post.content, post.title, post.category]);

  return (
    <div className='pt-32 mx-auto max-w-6xl px-2 sm:px-6 flex flex-col lg:flex-row gap-4 z-0 justify-center pb-10'>
      {/* Editor and Title */}
      <div className='flex-4 w-full lg:max-w-[800px]'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Create Post</h1>

        {/* Cover Image Upload */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Cover Image
          </label>

          {imagePreview ? (
            <div className='relative'>
              <img
                src={imagePreview}
                alt='Cover preview'
                className='w-full h-64 object-cover rounded-lg border border-gray-300'
              />
              <button
                onClick={removeImage}
                className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors'
              >
                <i className='fas fa-times'></i>
              </button>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadingImage ? (
                <div className='flex flex-col items-center'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2'></div>
                  <p className='text-gray-600'>Uploading image...</p>
                </div>
              ) : (
                <div className='flex flex-col items-center'>
                  <i className='fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4'></i>
                  <p className='text-gray-600 mb-2'>
                    Drag & drop an image here, or click to select
                  </p>
                  <p className='text-sm text-gray-500'>
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleFileSelect}
            className='hidden'
          />
        </div>

        <div className='mb-4'>
          <input
            type='text'
            placeholder='Post Title'
            value={post.title}
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div className='mb-6'>
          <JoditEditor
            ref={editor}
            value={post.content}
            config={config}
            onBlur={(newContent) => setPost({ ...post, content: newContent })}
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className='flex flex-col flex-1 w-full lg:w-auto gap-4'>
        <h2 className='text-xl sm:text-2xl font-semibold mt-10 mb-4 tracking-tighter'>
          Select Category
        </h2>
        <select
          className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          value={post.category}
          onChange={(e) =>
            setPost({
              ...post,
              category: (e.target as HTMLSelectElement).value,
            })
          }
        >
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
          <Button variant='primary' onClick={handlePublish}>
            <i className='fas fa-paper-plane'></i>
            <span>Publish Post</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreatePost;
