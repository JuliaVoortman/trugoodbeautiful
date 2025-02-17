import React, { useState, useEffect, useCallback } from 'react';
import ArticleCard from './ArticleCard';
import FeaturedStory from './FeaturedStory';

const ArticleDisplay = ({ articles, selectedSentiment }) => {
  const [displayCount, setDisplayCount] = useState(3);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [selectedDate, setSelectedDate] = useState('all');

  // Helper function to get relative date string
  const getRelativeDateString = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Extract unique dates from articles with proper formatting
  const uniqueDates = [...new Set(articles?.map(article => {
    if (!article.fields.publicationDate) return null;
    const date = new Date(article.fields.publicationDate);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  }))].filter(Boolean).sort((a, b) => new Date(b) - new Date(a));

  // Filter articles by selected date - memoized with useCallback
  const filterArticlesByDate = useCallback((articlesToFilter) => {
    if (!articlesToFilter || selectedDate === 'all') return articlesToFilter;
    
    return articlesToFilter.filter(article => {
      if (!article.fields.publicationDate) return false;
      const articleDate = new Date(article.fields.publicationDate);
      const formattedDate = articleDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

      if (selectedDate === 'today') {
        return formattedDate === getRelativeDateString(0);
      } else if (selectedDate === 'yesterday') {
        return formattedDate === getRelativeDateString(1);
      }
      
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
        <h1 className="text-xl text-slate-700">
          Featured story
        </h1>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 
            focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All dates</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option disabled>──────────</option>
          {uniqueDates
            .filter(date => 
              date !== getRelativeDateString(0) && 
              date !== getRelativeDateString(1)
            )
            .map(date => (
              <option key={date} value={date}>
                {date}
              </option>
            ))
          }
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