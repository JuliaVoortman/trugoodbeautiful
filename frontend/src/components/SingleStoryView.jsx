import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StoryModal from './StoryModal';

const SingleStoryView = ({ stories, selectedSentiment, setSelectedSentiment }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);

  useEffect(() => {
    if (stories?.length) {
      const foundStory = stories.find(s => (s.fields?.slug || s.sys.id) === slug);
      if (foundStory) {
        setStory(foundStory);
      } else {
        navigate('/'); // Redirect if story not found
      }
    }
  }, [slug, stories, navigate]);

  if (!story) return null;

  return (
    <StoryModal 
      isOpen={true}
      onClose={() => navigate('/')}
      story={story}
    />
  );
};

export default SingleStoryView;