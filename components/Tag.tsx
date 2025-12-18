import React from 'react';

interface TagProps {
  text: string;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ text, className = '' }) => {
  if (!text) return null;

  return (
    <div className="flex items-center mt-1 inline">
      <span
        className={`inline-flex items-center text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full px-2 py-0.5 truncate overflow-hidden whitespace-nowrap ${className}`}
      >
        {text}
      </span>
    </div>
  );
};

export default Tag; 