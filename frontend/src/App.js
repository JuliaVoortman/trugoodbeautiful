import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import useArticles from './hooks/useArticles';
import useStories from './hooks/useStories';
import { layoutStyles } from './styles/layout';
import './App.css';

// Import page components
import Stories from './pages/Stories';
import Articles from './pages/Articles';
import HowItWorks from './pages/HowItWorks';
import Sponsors from './pages/Sponsors';
import Shop from './pages/Shop';
import Sources from './pages/Sources';
import Contact from './pages/Contact';

const App = () => {
  // Fetch data using custom hooks
  const { articles, loading: articlesLoading, error: articlesError } = useArticles();
  const { stories, loading: storiesLoading, error: storiesError } = useStories();

  // Sentiment state for both content types
  const [articleSentiment, setArticleSentiment] = useState('positive');
  const [storySentiment, setStorySentiment] = useState('positive');

  // Filter functions for both content types
  const getFilteredContent = (content, selectedSentiment) => {
    if (!content) return [];
    
    return content.filter(item => {
      const sentiment = item?.fields?.sentimentType?.fields?.title;
      return selectedSentiment === 'positive'
        ? sentiment === 'Positive'
        : ['Neutral', 'Negative'].includes(sentiment);
    });
  };

  // Filter both content types
  const filteredArticles = getFilteredContent(articles, articleSentiment);
  const filteredStories = getFilteredContent(stories, storySentiment);

  // Debug logging
  useEffect(() => {
    console.log('Content States:', {
      articles: {
        total: articles?.length,
        filtered: filteredArticles.length,
        sentiment: articleSentiment
      },
      stories: {
        total: stories?.length,
        filtered: filteredStories.length,
        sentiment: storySentiment
      }
    });
  }, [articles, stories, filteredArticles, filteredStories, articleSentiment, storySentiment]);

  // Loading state
  if (articlesLoading || storiesLoading) {
    return (
      <div className={layoutStyles.loadingContainer}>
        <div className={layoutStyles.loadingText}>Loading content...</div>
      </div>
    );
  }

  // Error state
  if (articlesError || storiesError) {
    return (
      <div className={layoutStyles.loadingContainer}>
        <div className={layoutStyles.errorText}>
          Error: {articlesError || storiesError}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className={layoutStyles.container}>
        <Navigation />
        <Hero />

        <div className={layoutStyles.mainContent}>
          <Routes>
            {/* Stories is now the home page */}
            <Route 
              path="/" 
              element={
                <Stories 
                  selectedSentiment={storySentiment}
                  setSelectedSentiment={setStorySentiment}
                  filteredStories={filteredStories}
                />
              } 
            />
            {/* Articles has moved to its own route */}
            <Route 
              path="/articles" 
              element={
                <Articles 
                  selectedSentiment={articleSentiment}
                  setSelectedSentiment={setArticleSentiment}
                  filteredArticles={filteredArticles}
                />
              } 
            />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;