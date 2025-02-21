import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import StorySentimentFilter from '../components/StorySentimentFilter';
import StoryDisplay from '../components/StoryDisplay';
import StoryModal from '../components/StoryModal';

const Stories = ({ selectedSentiment, setSelectedSentiment, filteredStories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const { slug } = useParams();
  const location = useLocation();

  // Handle direct URL access and reload
  useEffect(() => {
    if (slug && filteredStories?.length) {
      const story = filteredStories.find(s => (s.fields?.slug || s.sys.id) === slug);
      if (story) {
        setSelectedStory(story);
        setIsModalOpen(true);
      }
    }
  }, [slug, filteredStories]);

  // Close modal when navigating to root
  useEffect(() => {
    if (location.pathname === '/') {
      setIsModalOpen(false);
      setSelectedStory(null);
    }
  }, [location]);

  // Handle story selection
  const handleStorySelect = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  return (
    <div className="m-6 px-0">
      <StorySentimentFilter 
        selectedSentiment={selectedSentiment}
        setSelectedSentiment={setSelectedSentiment}
      />
      
      <StoryDisplay 
        stories={filteredStories}
        selectedSentiment={selectedSentiment}
        onStorySelect={handleStorySelect}
      />

      <StoryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        story={selectedStory}
      />
    </div>
  );
};

export default Stories;