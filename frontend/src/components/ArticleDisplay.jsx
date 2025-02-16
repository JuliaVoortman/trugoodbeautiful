import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleDisplay = ({ articles }) => {
  // Add logging to debug
  console.log('Articles received in ArticleDisplay:', articles?.map(article => ({
    title: article.fields?.pageName,
    sentiment: article.fields?.sentimentType?.fields?.title
  })));

  return (
    <div className="mb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <ArticleCard key={article.sys.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleDisplay;