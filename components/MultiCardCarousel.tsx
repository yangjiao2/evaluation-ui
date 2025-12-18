import React from 'react';

interface Card {
  image?: string;
  title: string;
  description: string;
}

const MultiCardCarousel = ({ cards }: { cards: Array<Card> }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const isUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div id="card-carousel" className="mt-2">
      <div className="w-11/12 ">
        <div className="relative">
          
          <div className="flex space-x-4">
            {cards.slice(currentIndex, currentIndex + 3).map((card, index) => (
              <div className="flex-none w-1/3 p-4 bg-white rounded-lg shadow-md dark:bg-slate-800" key={index}>
                {card.image &&
                  <img className="w-full h-32 object-cover mb-4 rounded-lg" src={card.image} alt="Card" />
                }
                <h3 className="text-lg font-bold">{card.title}</h3>
                {isUrl(card.description) ? (
                  <a 
                    href={card.description} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 inline-block"
                    title="Open link"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                  </a>
                ) : (
                  <p className="text-gray-500">{card.description}</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 relative  bottom-64 ">
          <button
            className="w-8 h-8 rounded-full bg-gray-300 absolute top-1/2 transform -translate-y-1/2 left-0 ml-2"
            onClick={handlePrev}
          >
            &lt;
          </button>

          <button
            className="w-8 h-8 rounded-full bg-gray-300 absolute top-1/2 transform -translate-y-1/2 right-0 mr-2"
            onClick={handleNext}
          >
            &gt;
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiCardCarousel;