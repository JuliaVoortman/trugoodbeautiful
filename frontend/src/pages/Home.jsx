import React from 'react';
import SentimentFilter from '../components/SentimentFilter';
import ArticleDisplay from '../components/ArticleDisplay';

const Home = ({ selectedSentiment, setSelectedSentiment, filteredArticles }) => {
  return (
    <div className="m-6 px-0">
      <SentimentFilter 
        selectedSentiment={selectedSentiment}
        setSelectedSentiment={setSelectedSentiment}
      />
      
      <ArticleDisplay 
        articles={filteredArticles} 
        selectedSentiment={selectedSentiment}
      />
    </div>
  );
};

export default Home;