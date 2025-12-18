import React from 'react';


export default function DocumentRedirect() {
  const handleRedirect = () => {
    window.open('https://docs.google.com/document/d/1LBc5VCXMk48Kqe3SsO7FMXAwavzR3pKl4XwI_CU2V9I/edit?usp=sharing', '_blank'); // Change this to your actual document URL or route
  };

  return (
    <button
      onClick={handleRedirect}
      className="flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
      aria-label="Open Document"
    >
      <svg
        className="w-4 h-4 text-slate-500 dark:text-slate-400"
        width="16"
        height="16"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 4C3 3.44772 3.44772 3 4 3H10C11.1046 3 12 3.89543 12 5V19C12 17.8954 11.1046 17 10 17H4C3.44772 17 3 16.5523 3 16V4Z"
          className="fill-current"
        />
        <path
          d="M21 4C21 3.44772 20.5523 3 20 3H14C12.8954 3 12 3.89543 12 5V19C12 17.8954 12.8954 17 14 17H20C20.5523 17 21 16.5523 21 16V4Z"
          className="fill-current"
        />
      </svg>
    </button>
  );
}
