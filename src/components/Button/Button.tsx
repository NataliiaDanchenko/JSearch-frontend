'use client';

import React from 'react';

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
    >
      Like
    </button>
  );
};

export default Button;
