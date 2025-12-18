import React from 'react';

const ErrorPage = ({message = 'Error Loading Configuration', details = 'We\'re sorry, but there was a problem loading the necessary configuration.'}) => {
  return (
    <div className="flex flex-col items-center justify-items-start mt-[100px] min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-5 text-2xl text-[#76b900]">{message}</h1>
        {/* <p className="mb-5 text-base text-gray-600">{details}</p> */}
        {/* <button
          onClick={() => window.location.reload()}
          className="flex-1 px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-[#76b900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Retry
        </button> */}
      </div>
    </div>
  );
}

export default ErrorPage;
