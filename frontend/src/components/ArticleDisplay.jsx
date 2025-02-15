import React, { useState } from 'react';
import ArticleCard from './ArticleCard';

const ArticleDisplay = ({ articles }) => {
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  
  const sentiments = [
    { id: 'all', label: 'All Stories', color: 'bg-slate-500' },
    { id: 'positive', label: 'Positive', color: 'bg-emerald-500' },
    { id: 'neutral', label: 'Neutral', color: 'bg-blue-500' },
    { id: 'negative', label: 'Learning Opportunities', color: 'bg-amber-500' }
  ];

  const filteredArticles = selectedSentiment === 'all' 
    ? articles
    : articles?.filter(article => 
        article.sentimentType?.title.toLowerCase() === selectedSentiment
      );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Sentiment Filter Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          {sentiments.map((sentiment) => (
            <button
              key={sentiment.id}
              onClick={() => setSelectedSentiment(sentiment.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedSentiment === sentiment.id
                  ? `${sentiment.color} text-white`
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {sentiment.label}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles?.map((article) => (
            <ArticleCard key={article.sys.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDisplay;