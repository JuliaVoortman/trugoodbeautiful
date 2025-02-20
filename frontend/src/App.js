import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import useArticles from './hooks/useArticles';
import useStories from './hooks/useStories';
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
  // Articles state and data
  const { articles, loading: articlesLoading, error: articlesError } = useArticles();
  const [selectedSentiment, setSelectedSentiment] = useState('positive');

  // Stories state and data
  const { stories, loading: storiesLoading, error: storiesError } = useStories();
  const [storySelectedSentiment, setStorySelectedSentiment] = useState('positive');

  // Filter stories based on sentiment
  const filteredStories = stories?.filter(story => {
    const sentiment = story?.fields?.sentimentType?.fields?.title;
    return storySelectedSentiment === 'positive' 
      ? sentiment === 'Positive'
      : ['Neutral', 'Negative'].includes(sentiment);
  }) || [];

  // Filter articles based on sentiment
  const filteredArticles = articles?.filter(article => {
    const sentiment = article?.fields?.sentimentType?.fields?.title;
    return selectedSentiment === 'positive' 
      ? sentiment === 'Positive'
      : ['Neutral', 'Negative'].includes(sentiment);
  }) || [];

  if (articlesLoading || storiesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-slate-600">Loading stories of progress...</div>
      </div>
    );
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
      <div className="min-h-screen bg-white">
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
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;