import React from 'react';

const StorySentimentFilter = ({ selectedSentiment, setSelectedSentiment }) => {
  const sentiments = [
    { 
      id: 'positive',
      label: 'The good stuff', 
      color: 'bg-green-600',
      contentfulType: 'positive'
    },
    { 
      id: 'other',
      label: 'All the rest', 
      color: 'bg-slate-500',
      contentfulTypes: ['neutral', 'negative']
    }
  ];

  const handleSentimentClick = (sentimentId) => {
    console.log('Sentiment clicked:', sentimentId);
    setSelectedSentiment(sentimentId);
  };

  return (
    <div className="-mt-16 flex justify-start px-4 sm:px-6 py-4 border-b border-slate-200">
      {sentiments.map((sentiment) => (
        <button
          key={sentiment.id}
          onClick={() => handleSentimentClick(sentiment.id)}
          className={`
            px-6 py-2.5 rounded-lg text-sm transition-all duration-150 mr-4
            shadow-sm 
            ${selectedSentiment === sentiment.id
              ? `${sentiment.color} text-white`
              : 'bg-white text-slate-600 hover:bg-stone-200'
            }
          `}
        >
          {sentiment.label}
        </button>
      ))}
    </div>
  );
};

export default StorySentimentFilter;