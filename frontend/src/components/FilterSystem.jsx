import React, { useState, useEffect } from 'react';
import { Globe, Tag, X } from 'lucide-react';

const FilterSystem = ({ articles, onFilterChange }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique regions and tags from articles
  const regions = Array.from(new Set(articles.map(article => 
    article.fields.geographicLocation
  ))).sort();

  const allTags = Array.from(new Set(articles.flatMap(article => 
    article.fields.tags?.map(tag => tag.fields.name) || []
  ))).sort();

  // Filter articles based on selected criteria
  useEffect(() => {
    const filteredArticles = articles.filter(article => {
      const matchesRegion = selectedRegion === 'all' || 
        article.fields.geographicLocation === selectedRegion;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => 
          article.fields.tags?.some(articleTag => 
            articleTag.fields.name === tag
          )
        );

      return matchesRegion && matchesTags;
    });

    onFilterChange(filteredArticles);
  }, [selectedRegion, selectedTags, articles]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="mb-8">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center space-x-2 mx-auto transition-colors duration-300"
      >
        <Globe className="w-4 h-4" />
        <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
      </button>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Region Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Region</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRegion('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedRegion === 'all'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All Regions
              </button>
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedRegion === region
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Selection */}
          <div>
            <h3 className="text-lg font-medium mb-3">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedRegion !== 'all' || selectedTags.length > 0) && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-medium mb-2">Active Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedRegion !== 'all' && (
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm flex items-center">
                    {selectedRegion}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => setSelectedRegion('all')}
                    />
                  </span>
                )}
                {selectedTags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => toggleTag(tag)}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSystem;