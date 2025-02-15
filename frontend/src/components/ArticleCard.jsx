import React from 'react';

const ArticleCard = ({ article }) => {
  // Debug log to see what data we're receiving
  console.log('Article data in card:', article);

  // Extract fields from Contentful structure
  const {
    fields = {},
    sys = {}
  } = article || {};

  const {
    pageName,
    summary,
    geographicLocation,
    publicationDate,
    sourceOutlet,
    sentimentType,
    image
  } = fields;

  // Function to determine bias color
  const getBiasColor = (rating) => {
    const colors = {
      '1': 'text-blue-600',
      '2': 'text-blue-400',
      '3': 'text-slate-500',
      '4': 'amber-400',
      '5': 'text-amber-600'
    };
    return colors[rating] || 'text-slate-500';
  };

  // If no article data, show placeholder
  if (!article) {
    return (
      <div className="bg-white rounded-lg p-4">
        <p>No article data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image?.fields?.file?.url ? `https:${image.fields.file.url}` : '/api/placeholder/400/320'}
          alt={pageName || 'Article image'}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <span className="text-white text-sm">{geographicLocation}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            {sourceOutlet?.fields?.logo && (
              <img
                src={`https:${sourceOutlet.fields.logo.fields.file.url}`}
                alt={sourceOutlet.fields.name}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="text-sm text-slate-600">{sourceOutlet?.fields?.name}</span>
          </div>
          <span className={`text-sm font-medium ${getBiasColor(sourceOutlet?.fields?.biasRating)}`}>
            Bias Rating: {sourceOutlet?.fields?.biasRating}
          </span>
        </div>
        
        <h2 className="font-serif text-xl mb-3 text-slate-900 leading-tight">
          {pageName}
        </h2>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {summary}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <span className="text-sm text-slate-500">
            {publicationDate && new Date(publicationDate).toLocaleDateString()}
          </span>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs ${
              sentimentType?.fields?.title === 'Positive' ? 'bg-emerald-100 text-emerald-700' :
              sentimentType?.fields?.title === 'Neutral' ? 'bg-blue-100 text-blue-700' :
              'bg-amber-100 text-amber-700'
            }`}>
              {sentimentType?.fields?.title || 'Unknown'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;