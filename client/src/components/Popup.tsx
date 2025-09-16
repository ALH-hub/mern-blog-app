// components/Popup.tsx
import React, { useEffect } from 'react';

interface PopupProps {
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Popup: React.FC<PopupProps> = ({
  message,
  type = 'error',
  onClose,
  autoClose = true,
  duration = 4000,
}) => {
  // Auto close functionality
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  // Get icon and colors based on type
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 border-green-200',
          icon: 'fa-check-circle text-green-500',
          text: 'text-green-800',
          button: 'bg-green-500 hover:bg-green-600',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          icon: 'fa-exclamation-triangle text-yellow-500',
          text: 'text-yellow-800',
          button: 'bg-yellow-500 hover:bg-yellow-600',
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: 'fa-info-circle text-blue-500',
          text: 'text-blue-800',
          button: 'bg-blue-500 hover:bg-blue-600',
        };
      case 'error':
      default:
        return {
          bg: 'bg-red-50 border-red-200',
          icon: 'fa-exclamation-circle text-red-500',
          text: 'text-red-800',
          button: 'bg-red-500 hover:bg-red-600',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 backdrop-blur-sm'>
      {/* Popup Container with Animation */}
      <div
        className={`
        ${styles.bg} border-2 ${styles.bg.split(' ')[1]}
        p-6 rounded-2xl shadow-2xl max-w-md w-full
        transform transition-all duration-300 ease-out
        animate-bounce-in relative
      `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors'
          aria-label='Close'
        >
          <i className='fas fa-times text-lg'></i>
        </button>

        {/* Content */}
        <div className='flex items-start space-x-4'>
          {/* Icon */}
          <div className='flex-shrink-0'>
            <i className={`fas ${styles.icon} text-2xl`}></i>
          </div>

          {/* Message */}
          <div className='flex-1 pt-1'>
            <p className={`${styles.text} font-medium text-sm leading-relaxed`}>
              {message}
            </p>

            {/* Action Button */}
            <div className='mt-4 flex justify-end space-x-3'>
              <button
                onClick={onClose}
                className='px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors'
              >
                Dismiss
              </button>
              <button
                onClick={onClose}
                className={`
                  px-4 py-1.5 text-sm text-white rounded-lg font-medium
                  ${styles.button} transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  transform hover:scale-105 active:scale-95
                `}
              >
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar (for auto-close) */}
        {autoClose && (
          <div className='absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b-2xl overflow-hidden'>
            <div
              className={`h-full ${
                styles.button.split(' ')[0]
              } animate-progress`}
              style={{ animation: `progress ${duration}ms linear forwards` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
