import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';

// Import the ArticleCard component
import ArticleCard from './components/ArticleCard';

// Initialize Contentful client
const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSentiment, setSelectedSentiment] = useState('all');

  const sentiments = [
    { id: 'all', label: 'All Stories', color: 'bg-slate-500' },
    { id: 'positive', label: 'Positive', color: 'bg-emerald-500' },
    { id: 'neutral', label: 'Neutral', color: 'bg-blue-500' },
    { id: 'negative', label: 'Learning Opportunities', color: 'bg-amber-500' }
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'article',
          include: 2,
        });
        console.log('Fetched articles:', response.items);
        setArticles(response.items);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-xl text-slate-600">Loading articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Debug information */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Debug Information</h3>
          <p>Number of articles: {articles.length}</p>
        </div>

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
          {articles.map((article) => (
            <ArticleCard key={article.sys.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;