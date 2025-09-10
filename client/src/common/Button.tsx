import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline';
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false,
}) => {
  const baseClasses =
    'px-6 py-3 border-2 border-[#7c7dbd] rounded-lg font-semibold transition-all no-underline inline-flex items-center gap-2 duration-200 ease hover:scale-101 active:scale-90';

  const variantClasses = {
    primary: 'bg-[#544cdb] text-white hover:bg-[#4a42c4]',
    outline:
      'text-[#544cdb] bg-transparent hover:bg-[#544cdb] hover:text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
