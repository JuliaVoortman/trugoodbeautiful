import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import useArticles from './hooks/useArticles';
import { layoutStyles } from './styles/layout';
import './App.css';

// Import page components
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Sponsors from './pages/Sponsors';
import Shop from './pages/Shop';
import Sources from './pages/Sources';

function App() {
  const { articles, loading, error } = useArticles();
  const [selectedSentiment, setSelectedSentiment] = useState('positive');

  const filteredArticles = articles?.filter(article => {
    const sentimentType = article.fields?.sentimentType?.fields?.title;
    return selectedSentiment === 'positive' 
      ? sentimentType === 'Positive'
      : ['Neutral', 'Negative'].includes(sentimentType);
  });

  if (loading) {
    return (
      <div className={layoutStyles.loadingContainer}>
        <div className={layoutStyles.loadingText}>Loading stories of progress...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={layoutStyles.loadingContainer}>
        <div className={layoutStyles.errorText}>Error: {error}</div>
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
              <Route 
                path="/" 
                element={
                  <Home 
                    selectedSentiment={selectedSentiment}
                    setSelectedSentiment={setSelectedSentiment}
                    filteredArticles={filteredArticles}
                  />
                } 
              />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/sources" element={<Sources />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </div>
  
          <Footer />
        </div>
      </Router>
    );
}

export default App;