import React, { useState, useEffect, useCallback } from 'react';
import ArticleCard from './ArticleCard';
import FeaturedStory from './FeaturedStory';

const ArticleDisplay = ({ articles, selectedSentiment }) => {
  const [displayCount, setDisplayCount] = useState(3);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [selectedDate, setSelectedDate] = useState('all');

  // Extract unique dates from articles
  const uniqueDates = [...new Set(articles?.map(article => {
    const date = new Date(article.fields.publicationDate);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  }))].sort((a, b) => new Date(b) - new Date(a));

  // Filter articles by selected date - memoized with useCallback
  const filterArticlesByDate = useCallback((articlesToFilter) => {
    if (selectedDate === 'all') return articlesToFilter;
    
    return articlesToFilter.filter(article => {
      const articleDate = new Date(article.fields.publicationDate);
      const formattedDate = articleDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      return formattedDate === selectedDate;
    });
  }, [selectedDate]);

  // Set featured article and initial articles when articles array or date filter changes
  useEffect(() => {
    if (articles?.length > 0) {
      const filteredArticles = filterArticlesByDate(articles);
      
      if (filteredArticles.length > 0) {
        const featured = filteredArticles[0];
        setFeaturedArticle(featured);
        
        const remaining = filteredArticles.slice(1, 4);
        setDisplayedArticles(remaining);
        setDisplayCount(3);
      } else {
        setFeaturedArticle(null);
        setDisplayedArticles([]);
      }
    } else {
      setFeaturedArticle(null);
      setDisplayedArticles([]);
    }
  }, [articles, selectedDate, filterArticlesByDate]);

  // Update displayed articles when count changes
  useEffect(() => {
    if (articles?.length > 1) {
      const filteredArticles = filterArticlesByDate(articles);
      setDisplayedArticles(filteredArticles.slice(1, displayCount + 1));
    }
  }, [displayCount, articles, filterArticlesByDate]);

  const hasMore = filterArticlesByDate(articles)?.length > (displayCount + 1);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  if (!articles) {
    return <div>Loading articles...</div>;
  }

  return (
    <div>
      {/* Featured Story Header with Date Filter */}
      <div className="flex justify-between items-center pl-2 mb-2">
        <h1 className="text-xl font-semibold text-slate-800">
          Featured story
        </h1>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 
            focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All dates</option>
          {uniqueDates.map(date => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* Featured Story Section */}
      {featuredArticle && (
        <div className="pt-2 pb-20">
          <FeaturedStory article={featuredArticle} />
        </div>
      )}

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map((article) => (
          <ArticleCard 
            key={article.sys.id} 
            article={article} 
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-stone-200 hover:bg-green-600 hover:text-white text-slate-600 rounded-xl 
              transition-all duration-100 font-medium shadow-md hover:shadow-lg"
          >
            Load more stories ({filterArticlesByDate(articles).length - (displayCount + 1)} remaining)
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleDisplay;