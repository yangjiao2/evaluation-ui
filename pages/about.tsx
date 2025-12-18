'use client'
import Head from 'next/head';

// placeholder page, 
// todo - content will be updated based on discussion from product
export const About = () => {
  const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
  // console.log('hit /about route', {origin})          
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>About</title>
        <meta name="description" content="Learn more about what chatbots build on NVBot UI platform." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-6">
        <h1 className="text-3xl font-bold text-center mb-4 text-[#76b900]">About</h1>
        {/* <p className="text-lg text-gray-700 mt-4">
          For more detailed information on chatbot architecture and design, visit the <a href="https://confluence.nvidia.com/pages/viewpage.action?spaceKey=ITAppDev&title=ChatBot+UI+Framework+-+Architecture+and+Design" className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">NVIDIA Confluence page</a>.
        </p> */}
      </main>
    </div>
  );
}

export default About