import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import StoryCard from './StoryCard';
import FeaturedStory from './FeaturedStory';

const StoryDisplay = ({ stories, selectedSentiment }) => {
    console.log('StoryDisplay Component Debug:', {
      storiesCount: stories?.length,
      selectedSentiment,
      firstStory: stories?.[0]
    });
  
    const [displayCount, setDisplayCount] = useState(3);
    const [displayedStories, setDisplayedStories] = useState([]);
    const [featuredStory, setFeaturedStory] = useState(null);
    const [selectedDate, setSelectedDate] = useState('all');


  // Helper function for date formatting
  const getRelativeDateString = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get unique dates for filter menu
  const uniqueDates = [...new Set(stories?.map(story => {
    if (!story?.fields?.publicationDate) return null;
    const date = new Date(story.fields.publicationDate);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  }))].filter(Boolean).sort((a, b) => new Date(b) - new Date(a));

  // Filter stories by date
  const filterStoriesByDate = useCallback((storiesToFilter) => {
    if (!storiesToFilter || selectedDate === 'all') return storiesToFilter;
    
    return storiesToFilter.filter(story => {
      if (!story?.fields?.publicationDate) return false;
      
      const storyDate = new Date(story.fields.publicationDate);
      const formattedDate = storyDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

      if (selectedDate === 'today') {
        return formattedDate === getRelativeDateString(0);
      } else if (selectedDate === 'yesterday') {
        return formattedDate === getRelativeDateString(1);
      }
      return formattedDate === selectedDate;
    });
  }, [selectedDate]);

  // Handle initial load and date filtering
  useEffect(() => {
    // Only process if we have stories
    if (stories?.length > 0) {
      const dateFilteredStories = filterStoriesByDate(stories);
      
      if (dateFilteredStories?.length > 0) {
        // Set featured story to first story after date filtering
        setFeaturedStory(dateFilteredStories[0]);
        
        // Set remaining stories for display
        const remaining = dateFilteredStories.slice(1, displayCount + 1);
        setDisplayedStories(remaining);
      } else {
        // Clear everything if no stories match the date filter
        setFeaturedStory(null);
        setDisplayedStories([]);
      }
    } else {
      // Clear everything if no stories are provided
      setFeaturedStory(null);
      setDisplayedStories([]);
    }
  }, [stories, selectedDate, filterStoriesByDate, displayCount]);

  // Handle load more functionality
  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 3);
  };

  const hasMore = filterStoriesByDate(stories)?.length > (displayCount + 1);

  if (!stories?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <a 
          href="https://en.wikipedia.org/wiki/Transcendentals"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105"
        >
          <img 
            src="/wizard.png" 
            alt="Friendly wizard - Click to learn about Transcendentals" 
            className="w-60 h-70 cursor-pointer"
          />
        </a>
        <p className="text-lg text-slate-700 text-center">
          No stories here yet.
          <br />
          <span className="text-sm">
            Try switching to another filter!
          </span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center pl-2 mb-2">
        <h1 className="text-xl text-slate-700">
          Featured story
        </h1>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full justify-between items-center px-4 py-2 bg-white border 
            border-slate-200 rounded-lg text-sm text-slate-600 hover:border-slate-300 
            focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
            font-medium transition-colors duration-150">
            {selectedDate === 'all' ? 'All dates' : 
             selectedDate === 'today' ? 'Today' :
             selectedDate === 'yesterday' ? 'Yesterday' : 
             selectedDate}
            <svg className="h-4 w-4 ml-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-slate-100 
              rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedDate('all')}
                      className={`${
                        active ? 'bg-green-600 text-white' : 'text-slate-700'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      All dates
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedDate('today')}
                      className={`${
                        active ? 'bg-green-600 text-white' : 'text-slate-700'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Today
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedDate('yesterday')}
                      className={`${
                        active ? 'bg-green-600 text-white' : 'text-slate-700'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Yesterday
                    </button>
                  )}
                </Menu.Item>
              </div>
              {uniqueDates.length > 0 && (
                <div className="px-1 py-1">
                  {uniqueDates
                    .filter(date => 
                      date !== getRelativeDateString(0) && 
                      date !== getRelativeDateString(1)
                    )
                    .map(date => (
                      <Menu.Item key={date}>
                        {({ active }) => (
                          <button
                            onClick={() => setSelectedDate(date)}
                            className={`${
                              active ? 'bg-green-600 text-white' : 'text-slate-700'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {date}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                </div>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {featuredStory && (
        <div className="pt-2 pb-20">
          <FeaturedStory story={featuredStory} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedStories.map((story) => (
          <StoryCard 
            key={story.sys.id} 
            story={story} 
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-stone-200 hover:bg-green-600 hover:text-white text-slate-600 rounded-xl 
              transition-all duration-100 font-medium shadow-md hover:shadow-lg"
          >
            Load more stories ({filterStoriesByDate(stories).length - (displayCount + 1)} remaining)
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryDisplay;