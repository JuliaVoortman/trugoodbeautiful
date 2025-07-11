import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga4';

// Import components
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SingleStoryView from './components/SingleStoryView';

// Import hooks
import useArticles from './hooks/useArticles';
import useStories from './hooks/useStories';

// Import pages
import Stories from './pages/Stories';
import Articles from './pages/Articles';
import HowItWorks from './pages/HowItWorks';
import Sponsors from './pages/Sponsors';
import Shop from './pages/Shop';
import Sources from './pages/Sources';
import Contact from './pages/Contact';

import './App.css';

// Initialize ReactGA
ReactGA.initialize('G-DW840JQ300');

const App = () => {
  // Track pageviews
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  // Articles state and data
  const { articles, loading: articlesLoading, error: articlesError } = useArticles();
  const [selectedSentiment, setSelectedSentiment] = useState('positive');

  // Stories state and data
  const { stories, loading: storiesLoading, error: storiesError } = useStories();
  const [storySelectedSentiment, setStorySelectedSentiment] = useState('positive');

  // Debug logging for stories data
  useEffect(() => {
    console.log('Stories Data:', {
      totalStories: stories?.length,
      sentiments: stories?.map(story => story?.fields?.sentimentType?.fields?.title),
      selectedSentiment: storySelectedSentiment
    });
  }, [stories, storySelectedSentiment]);

  // Memoized filtered stories
  const filteredStories = useMemo(() => {
    return stories?.filter(story => {
      const sentiment = story?.fields?.sentimentType?.fields?.title;
      
      console.log('Filtering story:', {
        id: story?.sys?.id,
        title: story?.fields?.title,
        sentiment,
        selectedSentiment: storySelectedSentiment,
        isPositive: sentiment === 'Positive',
        isOther: ['Neutral', 'Negative'].includes(sentiment)
      });

      if (!sentiment) return false;

      return storySelectedSentiment === 'positive'
        ? sentiment === 'Positive'
        : ['Neutral', 'Negative'].includes(sentiment);
    }) || [];
  }, [stories, storySelectedSentiment]);

  // Memoized filtered articles
  const filteredArticles = useMemo(() => {
    return articles?.filter(article => {
      const sentiment = article?.fields?.sentimentType?.fields?.title;
      
      console.log('Filtering article:', {
        id: article?.sys?.id,
        title: article?.fields?.title,
        sentiment,
        selectedSentiment,
        isPositive: sentiment === 'Positive',
        isOther: ['Neutral', 'Negative'].includes(sentiment)
      });

      if (!sentiment) return false;

      return selectedSentiment === 'positive'
        ? sentiment === 'Positive'
        : ['Neutral', 'Negative'].includes(sentiment);
    }) || [];
  }, [articles, selectedSentiment]);

  // Debug logging for filtered results
  useEffect(() => {
    console.log('Filtered Results:', {
      totalStories: stories?.length,
      filteredStories: filteredStories.length,
      totalArticles: articles?.length,
      filteredArticles: filteredArticles.length
    });
  }, [stories, articles, filteredStories, filteredArticles]);

  if (articlesLoading || storiesLoading) {
    return <Loader message="Loading stories of progress..." />;
  }
  

  if (articlesError || storiesError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">
          Error: {articlesError || storiesError}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navigation />
        <Hero />

        <main className="container mx-auto px-4 py-8">
        <Routes>
  <Route 
    path="/" 
    element={
      <Stories 
        selectedSentiment={storySelectedSentiment}
        setSelectedSentiment={setStorySelectedSentiment}
        filteredStories={filteredStories}
      />
    } 
  />
  <Route 
    path="/stories/:slug" 
    element={
      <SingleStoryView 
        stories={stories}
        selectedSentiment={storySelectedSentiment}
        setSelectedSentiment={setStorySelectedSentiment}
      />
    } 
  />
            <Route 
              path="/articles" 
              element={
                <Articles 
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/stories/:slug" element={<Stories stories={stories} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;