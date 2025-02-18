import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ArticleCard from './ArticleCard';
import FeaturedStory from './FeaturedStory';

const ArticleDisplay = ({ articles, selectedSentiment }) => {
  const [displayCount, setDisplayCount] = useState(3);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [selectedDate, setSelectedDate] = useState('all');

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

  const uniqueDates = [...new Set(articles?.map(article => {
    if (!article.fields.publicationDate) return null;
    const date = new Date(article.fields.publicationDate);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  }))].filter(Boolean).sort((a, b) => new Date(b) - new Date(a));

  const filterArticlesByDate = useCallback((articlesToFilter) => {
    if (!articlesToFilter || selectedDate === 'all') return articlesToFilter;
    
    return articlesToFilter.filter(article => {
      if (!article.fields.publicationDate) return false;
      const articleDate = new Date(article.fields.publicationDate);
      const formattedDate = articleDate.toLocaleDateString('en-US', {
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

  useEffect(() => {
    if (articles?.length > 0) {
      const filteredArticles = filterArticlesByDate(articles);
      
      if (filteredArticles.length > 0) {
        const featured = filteredArticles[0];
        setFeaturedArticle(featured);
        
        const remaining = filteredArticles.slice(1, 4);
        setDisplayedArticles(remaining);
        setDisplayCount(3);
      } else {
        setFeaturedArticle(null);
        setDisplayedArticles([]);
      }
    } else {
      setFeaturedArticle(null);
      setDisplayedArticles([]);
    }
  }, [articles, selectedDate, filterArticlesByDate]);

  useEffect(() => {
    if (articles?.length > 1) {
      const filteredArticles = filterArticlesByDate(articles);
      setDisplayedArticles(filteredArticles.slice(1, displayCount + 1));
    }
  }, [displayCount, articles, filterArticlesByDate]);

  const hasMore = filterArticlesByDate(articles)?.length > (displayCount + 1);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  if (!articles) {
    return <div>Loading articles...</div>;
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
            focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent
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
                        active ? 'bg-blue-700 text-white' : 'text-slate-700'
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
                        active ? 'bg-blue-700 text-white' : 'text-slate-700'
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
                        active ? 'bg-blue-700 text-white' : 'text-slate-700'
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
                              active ? 'bg-blue-700 text-white' : 'text-slate-700'
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

      {featuredArticle && (
        <div className="pt-2 pb-20">
          <FeaturedStory article={featuredArticle} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map((article) => (
          <ArticleCard 
            key={article.sys.id} 
            article={article} 
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
            Load more stories ({filterArticlesByDate(articles).length - (displayCount + 1)} remaining)
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleDisplay;