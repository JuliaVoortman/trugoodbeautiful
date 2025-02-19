const StoryCard = ({ story }) => {
  console.log('Story data in card:', {
    fullStory: story,
    fields: story?.fields,
    title: story?.fields?.title,
    contentType: story?.sys?.contentType
  });

return (
  <div className="bg-stone-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 text-sm bg-stone-50 text-slate-600 rounded-full">
          {story.fields?.category?.fields?.title || 'Uncategorized'}
        </span>
        <span className="text-green-600 text-sm font-medium flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
          {story.fields?.sentiment?.fields?.title || 'Neutral'}
        </span>
      </div>

      <h2 className="text-xl font-semibold text-slate-800 mb-3 leading-tight">
        {story.fields?.title || 'Untitled'}
      </h2>

      <p className="text-slate-600 mb-4 line-clamp-3">
        {story.fields?.summary || 'No summary available'}
      </p>

      {story.fields?.image?.fields?.file?.url && (
        <img 
          src={`https:${story.fields.image.fields.file.url}`}
          alt={story.fields.image.fields.title || story.fields.title}
          className="w-full h-48 object-cover mb-4 rounded-lg"
        />
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        {story.fields?.tags?.map(tag => (
          <a 
            key={tag.sys.id}
            href={`/tags/${tag.fields.slug || tag.sys.id}`}
            className="px-3 py-1 text-sm bg-stone-50 text-slate-600 rounded-full flex items-center gap-1
              hover:bg-stone-100 hover:text-green-600 transition-colors duration-150 group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className="w-3.5 h-3.5 group-hover:text-green-600 transition-colors duration-150"
            >
              <path 
                fillRule="evenodd" 
                d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" 
                clipRule="evenodd" 
              />
            </svg>
            {tag.fields.title}
          </a>
        ))}
        {story.fields?.location && (
          <span className="px-3 py-1 text-sm bg-blue-900 text-white rounded-full">
            {story.fields.location}
          </span>
        )}
      </div>
    </div>
  </div>
);
};

export default StoryCard;