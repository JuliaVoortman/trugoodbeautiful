import { useState, useEffect } from 'react';
import { getStories } from '../lib/contentful';

const useStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const fetchedStories = await getStories();
        console.log('Fetched stories:', fetchedStories); // Debug log
        setStories(fetchedStories);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return { stories, loading, error };
};

export default useStories;