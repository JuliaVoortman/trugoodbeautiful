import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import ArticleCard from './components/ArticleCard';
import FilterSystem from './components/FilterSystem';
import ContinentsMap from './components/map/ContinentsMap'; // Import ContinentsMap
import './App.css';

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

function App() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSentiment, setSelectedSentiment] = useState('all');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'article',
          include: 2,
        });

        const articleData = response.items.map((item) => ({
          ...item,
          coordinates: [
            parseFloat(item.fields.geographicLocation.split(", ")[1]), //longitude
            parseFloat(item.fields.geographicLocation.split(", ")[0]), //latitude
          ],
          sentiment: item.fields.sentimentType.fields.title,
        }));

        setArticles(articleData);
        setFilteredArticles(articleData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleRegionSelect = (region) => {
    setFilteredArticles(
      articles.filter(article => 
        article.fields.geographicLocation === region
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-xl text-slate-600">Loading stories of progress...</div>
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
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-serif text-slate-800 mb-2">TruGoodBeautiful</h1>
          <p className="text-slate-600">Illuminating Progress, Celebrating Solutions</p>
        </header>

        <ContinentsMap /> {/* Render ContinentsMap component */}
        
        <FilterSystem 
          articles={articles} 
          onFilterChange={setFilteredArticles} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.sys.id} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No stories found for the selected filters.</p>
            <button 
              onClick={() => setFilteredArticles(articles)}
              className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;