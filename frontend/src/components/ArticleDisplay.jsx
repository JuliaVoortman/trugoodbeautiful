// src/components/ArticleDisplay.js
import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleDisplay = ({ articles }) => {
  return (
    <div>
      {/* Article Grid */}
      <div className="-mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <ArticleCard key={article.sys.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleDisplay;