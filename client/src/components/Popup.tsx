import React from 'react';

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
        <p className='mb-4 text-gray-800'>{message}</p>
        <button
          onClick={onClose}
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
