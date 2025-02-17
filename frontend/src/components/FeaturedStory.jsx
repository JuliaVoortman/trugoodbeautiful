import React from 'react';

const FeaturedStory = ({ article }) => (
  <div>
    <div className="bg-stone-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full max-h-72 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <a 
                href="https://www.allsides.com/media-bias/ratings" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline text-xs text-slate-500 font-medium hover:text-slate-700 transition-colors"
              >
                Source bias:
              </a>
              <span 
                className="ml-1 inline-flex items-center text-slate-400 hover:text-slate-500 cursor-help"
                title="Learn more about media bias ratings from AllSides"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  className="w-3 h-3"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-.25 3.75a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </span>
            </div>
            <span className="px-3 py-1 text-sm bg-stone-50 text-slate-600 rounded-full">
              {article.fields?.sourceOutlet?.fields?.biasRating?.fields?.title || 'Center'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-emerald-600 text-sm font-medium flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></span>
              {article.fields?.sentimentType?.fields?.title || 'Positive'}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-medium font-semibold text-slate-800 mb-2">
          {article.fields?.pageName}
        </h3>

        <p className="text-slate-600 mb-4 line-clamp-2 flex-grow">
          {article.fields?.summary}
        </p>

        {article.fields?.image?.fields?.file?.url && (
          <img 
            src={`https:${article.fields.image.fields.file.url}`}
            alt={article.fields.image.fields.title || article.fields.pageName}
            className="w-full h-32 object-cover mb-4 rounded-lg"
          />
        )}

        <div className="flex flex-wrap gap-2">
          {article.fields?.sourceOutlet?.fields && (
            <span className="px-3 py-1 text-sm bg-slate-50 text-slate-600 rounded-full flex items-center gap-2">
              {article.fields.sourceOutlet.fields.logo?.fields?.file?.url && (
                <img 
                  src={`https:${article.fields.sourceOutlet.fields.logo.fields.file.url}`}
                  alt={article.fields.sourceOutlet.fields.name}
                  className="h-4 w-auto object-contain"
                />
              )}
              {article.fields.sourceOutlet.fields.name}
            </span>
          )}
          <span className="px-3 py-1 text-sm bg-blue-900 text-white rounded-full">
            {article.fields?.geographicLocation || 'Location unknown'}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedStory;