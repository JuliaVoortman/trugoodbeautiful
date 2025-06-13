import React from 'react';

const SentimentFilter = ({ selectedSentiment, setSelectedSentiment }) => {
  const sentiments = [
    { 
      id: 'positive',
      label: 'The good stuff', 
      color: 'bg-emerald-500 hover:bg-emerald-600',
      textColor: 'text-emerald-600'
    },
    { 
      id: 'other',
      label: 'All the rest', 
      color: 'bg-slate-500 hover:bg-slate-600',
      textColor: 'text-slate-600'
    }
  ];

  return (
    <div className="relative -mt-16 px-4 sm:px-6 z-[50]">
      <div className="bg-white rounded-lg p-1 shadow-sm inline-flex">
        {sentiments.map((sentiment) => (
          <button
            key={sentiment.id}
            onClick={() => setSelectedSentiment(sentiment.id)}
            className={`
              relative px-6 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${selectedSentiment === sentiment.id
                ? `${sentiment.color} text-white`
                : `${sentiment.textColor} hover:bg-slate-50`
              }
            `}
          >
            {sentiment.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SentimentFilter;