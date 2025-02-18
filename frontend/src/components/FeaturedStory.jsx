import React from 'react';

const FeaturedStory = ({ article }) => (
  <div>
    <div className="bg-stone-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full max-h-72 flex flex-col">
      <div className="p-6 flex-grow">
      <div className="flex items-center gap-3 mb-4">
  <div className="flex items-center gap-1 group relative">
    <span className="px-3 py-1 text-sm bg-stone-50 text-slate-600 rounded-full flex items-center gap-1">
      {article.fields?.sourceOutlet?.fields?.biasRating?.fields?.title || 'Center'}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-4 h-4 text-slate-400"
      >
        <path 
          fillRule="evenodd" 
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" 
          clipRule="evenodd" 
        />
      </svg>
    </span>
    <div className="absolute left-0 top-full mt-2 w-64 bg-slate-800 text-white text-sm rounded-md py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
      Media bias rating from AllSides. These ratings help you identify potential bias in news coverage.
    </div>
  </div>
  <div className="flex items-center gap-1">
    <span className="text-emerald-600 text-sm font-medium flex items-center">
      <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></span>
      {article.fields?.sentimentType?.fields?.title || 'Positive'}
    </span>
  </div>
</div>

        <h3 className="text-lg font-medium font-semibold text-slate-800 mb-2">
          {article.fields?.title}
        </h3>

        <p className="text-slate-600 mb-4 line-clamp-2 flex-grow">
          {article.fields?.summary}
        </p>

        {article.fields?.image?.fields?.file?.url && (
          <img 
            src={`https:${article.fields.image.fields.file.url}`}
            alt={article.fields.image.fields.title || article.fields.title}
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