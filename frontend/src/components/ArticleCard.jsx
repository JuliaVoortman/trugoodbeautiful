const ArticleCard = ({ article }) => {
  console.log('Article data in card:', article);
  
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">
            {article.fields?.allSidesBiasRating?.fields?.title || 'Center'}
          </span>
          <span className="text-emerald-600 text-sm font-medium flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></span>
            {article.fields?.sentimentType?.fields?.title || 'Positive'}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-slate-800 mb-3 leading-tight">
          {article.fields?.pageName || 'Untitled'}
        </h2>

        <p className="text-slate-600 mb-4 line-clamp-3">
          {article.fields?.summary || 'No summary available'}
        </p>

        {article.fields?.image?.fields?.file?.url && (
          <img 
            src={`https:${article.fields.image.fields.file.url}`}
            alt={article.fields.image.fields.title || article.fields.pageName}
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {article.fields?.sourceOutlet?.fields?.title && (
            <span className="px-3 py-1 text-sm bg-slate-50 text-slate-600 rounded-full">
              {article.fields.sourceOutlet.fields.title}
            </span>
          )}
          <span className="px-3 py-1 text-sm bg-slate-50 text-slate-600 rounded-full">
            {article.fields?.geographicLocation || 'Location unknown'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;