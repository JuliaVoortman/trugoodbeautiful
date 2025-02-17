import React from 'react';

const FeaturedStory = ({ article }) => (
  <div>
    <div className="bg-stone-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full max-h-72 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-sm bg-stone-50 text-slate-600 rounded-full">
            {article.fields?.allSidesBiasRating?.fields?.title || 'Center'}
          </span>
          <span className="text-emerald-600 text-sm font-medium flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></span>
            {article.fields?.sentimentType?.fields?.title || 'Positive'}
          </span>
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