import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';

const ArticleDisplay = ({ articles }) => {
  const [displayCount, setDisplayCount] = useState(3);
  const [displayedArticles, setDisplayedArticles] = useState([]);

  useEffect(() => {
    if (articles?.length > 0) {
      setDisplayedArticles(articles.slice(0, displayCount));
    }
  }, [articles, displayCount]);

  // Debug logs
  useEffect(() => {
    console.log({
      articlesReceived: !!articles,
      totalArticles: articles?.length,
      displayCount,
      displayedCount: displayedArticles?.length,
      hasMore: articles?.length > displayCount
    });
  }, [articles, displayCount, displayedArticles]);

  const hasMore = articles?.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  if (!articles) {
    return <div>Loading articles...</div>;
  }

  return (
    <div className="mb-8 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map((article) => (
          <ArticleCard 
            key={article.sys.id} 
            article={article} 
          />
        ))}
      </div>

      {hasMore && articles.length > 3 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-stone-200 hover:bg-green-600 hover:text-white text-slate-600 rounded-xl 
              transition-all duration-100 font-medium shadow-md hover:shadow-lg"
          >
            Load more stories ({articles.length - displayCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleDisplay;