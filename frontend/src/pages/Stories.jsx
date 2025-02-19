import React from 'react';
import StorySentimentFilter from '../components/StorySentimentFilter';
import StoryDisplay from '../components/StoryDisplay';

const Stories = ({ selectedSentiment, setSelectedSentiment, filteredStories }) => {
  return (
    
    <div className="m-6 px-0">
      <StorySentimentFilter 
        selectedSentiment={selectedSentiment}
        setSelectedSentiment={setSelectedSentiment}
      />
      
      <StoryDisplay 
        stories={filteredStories} 
        selectedSentiment={selectedSentiment}
      />
    </div>
  );
};

export default Stories;