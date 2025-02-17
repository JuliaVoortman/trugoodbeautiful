import React from 'react';

const SentimentFilter = ({ selectedSentiment, setSelectedSentiment }) => {
  const sentiments = [
    { 
      id: 'positive',
      label: 'The good stuff', 
      color: 'bg-green-600',
      contentfulType: 'Positive'
    },
    { 
      id: 'other',
      label: 'All the rest', 
      color: 'bg-slate-500',
      contentfulTypes: ['Neutral', 'Negative']
    }
  ];

  const handleSentimentClick = (sentimentId) => {
    console.log('Sentiment clicked:', sentimentId);
    setSelectedSentiment(sentimentId);
  };

  return (
    <div className="-mt-16 flex justify-center gap-4 py-4 border-b border-slate-300">
      {sentiments.map((sentiment) => (
        <button
          key={sentiment.id}
          onClick={() => handleSentimentClick(sentiment.id)}
          className={`w-44 h-12 flex items-center justify-center rounded-xl 
            transition-all duration-100 font-medium cursor-pointer
            ${selectedSentiment === sentiment.id
              ? `${sentiment.color} text-white shadow-lg transform -translate-y-1 scale-105 border-2 border-white`
              : 'bg-white text-slate-600 bg-stone-50 -translate-y-0.5 shadow-md hover:shadow-lg'
            }`}
        >
          <span className="block w-full text-center">
            {sentiment.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SentimentFilter;