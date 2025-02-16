import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import ArticleDisplay from './components/ArticleDisplay';
import FilterSystem from './components/FilterSystem';
import ContinentsMap from './components/map/ContinentsMap';
import Footer from './components/Footer';
import './App.css';

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

const Navigation = () => (
  <nav className="absolute bottom-0 right-0 p-6 z-10">
    <ul className="flex space-x-8">
      <li>
        <a href="#articles" className="text-white hover:text-slate-300 font-medium transition-colors">
          Articles
        </a>
      </li>
      <li>
        <a href="#howitworks" className="text-white hover:text-slate-300 font-medium transition-colors">
          How it works
        </a>
      </li>
      <li>
        <a href="#donate" className="text-white hover:text-slate-300 font-medium transition-colors">
          Sponsors
        </a>
      </li>
      <li>
        <a href="#donate" className="text-white hover:text-slate-300 font-medium transition-colors">
          Donate
        </a>
      </li>
    </ul>
  </nav>
);

const FeaturedStory = ({ article }) => (
  <div> 
    <h1 className="text-xl font-semibold text-slate-800 items-center mb-4 leading-tight">Featured story</h1>
    <div className="bg-stone-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full max-h-72 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-sm bg-stone-50 text-slate-600 rounded-full">
            {article.fields?.allSidesBiasRating?.fields?.title || 'Center'}
          </span>
          <span className="text-emerald-600 text-sm font-medium flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></span>
            {article.fields?.sentimentType?.fields?.title || 'Positive'}
          </span>
        </div>

        <h3 className="text-lg font-medium font-semibold text-slate-800 mb-2">
          {article.fields?.pageName}
        </h3>

        <p className="text-slate-600 mb-4 line-clamp-3 flex-grow">
          {article.fields?.summary}
        </p>

        {article.fields?.image?.fields?.file?.url && (
          <img 
            src={`https:${article.fields.image.fields.file.url}`}
            alt={article.fields.image.fields.title || article.fields.pageName}
            className="w-full h-32 object-cover mb-4 rounded-lg"
          />
        )}

        <div className="flex flex-wrap gap-2">
          {article.fields?.sourceOutlet?.fields && (
            <span className="px-3 py-1 text-sm bg-slate-50 text-slate-600 rounded-full flex items-center gap-2">
              {article.fields.sourceOutlet.fields.logo?.fields?.file?.url && (
                <img 
                  src={`https:${article.fields.sourceOutlet.fields.logo.fields.file.url}`}
                  alt={article.fields.sourceOutlet.fields.name}
                  className="h-4 w-auto object-contain"
                />
              )}
              {article.fields.sourceOutlet.fields.name}
            </span>
          )}
          <span className="px-3 py-1 text-sm bg-blue-900 text-white rounded-full">
            {article.fields?.geographicLocation || 'Location unknown'}
          </span>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSentiment, setSelectedSentiment] = useState('good');

  const sentiments = [
    { id: 'good', label: 'The good stuff', color: 'bg-green-600' },
    { id: 'rest', label: 'All the rest', color: 'bg-slate-500' }
  ];

  const filteredArticles = articles?.filter(article => {
    const sentimentTitle = article.fields?.sentimentType?.fields?.title?.toLowerCase();
    if (selectedSentiment === 'good') {
      return sentimentTitle === 'positive';
    } else {
      return ['neutral', 'negative'].includes(sentimentTitle);
    }
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'article',
          include: 2,
        });
        
        const articleData = response.items.map((item) => ({
          ...item,
          coordinates: item.fields.geographicLocation ? [
            parseFloat(item.fields.geographicLocation.split(", ")[1]),
            parseFloat(item.fields.geographicLocation.split(", ")[0]),
          ] : null
        }));
        
        setArticles(articleData);
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
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="text-xl text-slate-300">Loading stories of progress...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="text-xl text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-60 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-bottom"
          style={{ 
            backgroundImage: 'url("/new-landscape.jpg")',
            filter: 'brightness(0.4)'
          }}
        />
        
        <Navigation />

        <div className="relative z-10 h-full flex justify-left m-10 pl-7">
          <div>
            <img 
              src="/logo.svg" 
              alt="TruGoodBeautiful Logo" 
              className="h-24 mx-auto filter drop-shadow-lg"
            />
            <p className="text-lg text-white drop-shadow m-2">
              Finding light in the headlines
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-0">
          <div className="-mt-10 flex justify-start gap-4 py-4 border-b border-slate-300 pl-4">
            {sentiments.map((sentiment) => (
              <button
                key={sentiment.id}
                onClick={() => setSelectedSentiment(sentiment.id)}
                className={`w-44 h-12 flex items-center justify-center rounded-xl transition-all duration-100 font-medium cursor-pointer
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

          <div className="pt-4 mb-10">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-6/12">
                {articles[0] && <FeaturedStory article={articles[0]} />}
              </div>
              
              <div className="lg:w-6/12 flex flex-col">
                <div className="flex-grow">
                  <ContinentsMap />
                </div>
              </div>
            </div>
          </div>

          <div>
            <ArticleDisplay articles={filteredArticles} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;