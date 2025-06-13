import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MapPinIcon, 
  ClockIcon, 
  ShareIcon, 
  BookmarkIcon,
  XMarkIcon,
  ChartBarIcon,
  NewspaperIcon,
  LightBulbIcon,
  ChevronDownIcon,
  UserIcon,           // Added
  ChatBubbleLeftIcon, // Added
  TrophyIcon,          // Added
  ChevronUpIcon,
  LockClosedIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const StoryModal = ({ isOpen, onClose, story }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen && story) {
      const slug = story.fields?.slug || story.sys.id;
      if (location.pathname !== `/stories/${slug}`) {
        navigate(`/stories/${slug}`, { replace: true });
      }
    }
  }, [isOpen, story, navigate, location]);

  const handleClose = (e) => {
    e?.preventDefault();
    onClose();
    if (location.pathname.includes('/stories/')) {
      navigate('/', { replace: true });
    }
  };

  const truncateSummary = (text, lines = 10) => {
    if (!text) return '';
    const words = text.split(' ');
    const truncated = words.slice(0, lines * 8).join(' ');
    return words.length > lines * 8 ? `${truncated}...` : text;
  };

  if (!story) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0">
        <Dialog.Panel className="w-full h-full bg-white">
          <div className="h-full overflow-y-auto">
          
{/* Header with green background */}
<div className="sticky top-0 bg-green-600 px-4 sm:px-6 py-4 border-b border-green-500 flex justify-between items-center z-10">
  {/* User Profile Actions */}
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
        <UserIcon className="w-5 h-5 text-white" />
      </div>
      <div className="hidden sm:block">
  <button 
    onClick={() => navigate('/login')} 
    className="text-sm text-white hover:text-green-50 transition-colors"
  >
    Sign in
  </button>
</div>

    </div>
    <nav className="hidden sm:flex items-center gap-6">
      <button className="text-sm text-white hover:text-green-50 flex items-center gap-2">
        <BookmarkIcon className="w-4 h-4" />
        <span>My Bookmarks</span>
        <span className="ml-1 px-2 py-0.5 text-xs bg-green-500 rounded text-white">0</span>
      </button>
      <button className="text-sm text-white hover:text-green-50 flex items-center gap-2">
        <ChatBubbleLeftIcon className="w-4 h-4" />
        <span>My Comments</span>
        <span className="ml-1 px-2 py-0.5 text-xs bg-green-500 rounded text-white">0</span>
      </button>
      <button className="text-sm text-white hover:text-green-50 flex items-center gap-2">
        <TrophyIcon className="w-4 h-4" />
        <span>My Points</span>
        <span className="ml-1 px-2 py-0.5 text-xs bg-green-500 rounded text-white">0</span>
      </button>
    </nav>
  </div>

  {/* Close Button */}
  <button
    onClick={handleClose}
    className="p-2 hover:bg-green-500 rounded-lg transition-colors border-2 border-green-500"
    aria-label="Close modal"
  >
    <XMarkIcon className="w-5 h-5 text-white" />
  </button>
</div>
            {/* Main Content */}
            <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
              {/* Top Section - Two Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                {/* Left Column - Title, Date, and Summary (3/5 width) */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <h1 className="text-2xl font-semibold text-slate-800 mb-2">
                      {story.fields?.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{new Date(story.fields?.publicationDate).toLocaleString()}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <NewspaperIcon className="w-4 h-4" />
                        {story.fields?.sourceOutlet?.fields?.name}
                      </span>
                    </div>
                  </div>

                  <div className="prose max-w-none bg-white rounded-xl shadow-sm p-6">
                    <div className={`relative ${!isSummaryExpanded && 'max-h-[250px] overflow-hidden'}`}>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {isSummaryExpanded 
                          ? story.fields?.summary
                          : truncateSummary(story.fields?.summary)}
                      </p>
                      {!isSummaryExpanded && story.fields?.summary?.split(' ').length > 80 && (
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                      )}
                    </div>
                    {story.fields?.summary?.split(' ').length > 80 && (
                      <button
                        onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                        className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-slate-600 hover:text-slate-800"
                      >
                        {isSummaryExpanded ? (
                          <>Show less <ChevronUpIcon className="w-5 h-5" /></>
                        ) : (
                          <>Read more <ChevronDownIcon className="w-5 h-5" /></>
                        )}
                      </button>
                    )}
                  </div>
                </div>

               {/* Right Column - Image and Info (2/5 width) */}
<div className="lg:col-span-2 space-y-6">
  {/* Share Actions */}
  <div className="flex justify-end gap-2 pb-2">
    <button 
      className="p-2 hover:bg-slate-100 rounded-full transition-colors"
      aria-label="Share story"
    >
      <ShareIcon className="w-5 h-5 text-slate-600" />
    </button>
    <button 
      className={`p-2 hover:bg-slate-100 rounded-full transition-colors ${
        isSaved ? 'text-green-600' : 'text-slate-600'
      }`}
      onClick={() => setIsSaved(!isSaved)}
      aria-label={isSaved ? 'Remove from saved stories' : 'Save story'}
    >
      <BookmarkIcon className="w-5 h-5" />
    </button>
  </div>

  {/* Main Image */}
  {story.fields?.mainImage?.fields?.file?.url && (
    <img 
      src={`https:${story.fields.mainImage.fields.file.url}`}
      alt={story.fields.mainImage.fields.title || story.fields.title}
      className="w-full aspect-video object-cover rounded-xl shadow-sm"
    />
  )}

  {/* Info Grid */}
  <div className="space-y-4">
    {/* Location & Sentiment */}
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 text-slate-600 mb-4">
        <MapPinIcon className="w-5 h-5" />
        <span>{story.fields?.location || 'Global'}</span>
      </div>
      <div className="flex items-center gap-2">
        <ChartBarIcon className="w-5 h-5 text-green-600" />
        <span className="text-green-600 font-medium">
          {story.fields?.sentimentType?.fields?.title || 'Neutral'}
        </span>
      </div>
    </div>

    {/* Why This Matters */}
    <div className="bg-green-50 rounded-xl p-4">
      <h3 className="text-base font-medium text-green-900 mb-2 flex items-center gap-2">
        <LightBulbIcon className="w-5 h-5" />
        Why this matters
      </h3>
      <p className="text-sm text-green-800">
        {story.fields?.impact || 'Impact analysis not available'}
      </p>
    </div>

    {/* Comments Section */}
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b border-slate-100">
        <h3 className="font-medium text-slate-800">Comments</h3>
      </div>
      
      <div className={`relative ${!isCommentsExpanded && 'max-h-[300px] overflow-hidden'}`}>
        <div className="p-4 space-y-4">
          {/* Comment Input - Locked State */}
<div className="flex gap-3">
  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
    <UserIcon className="w-5 h-5 text-slate-400" />
  </div>
  <div className="flex-1 relative">
    <div className="absolute inset-0 bg-slate-50 rounded-lg flex items-center justify-center z-10">
      <button 
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        onClick={() => navigate('/login')}
      >
        Get Verified to Comment
        <LockClosedIcon className="w-4 h-4" />
      </button>
    </div>
    <textarea
      disabled
      placeholder="Add your thoughts..."
      className="flex-1 w-full min-h-[80px] p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 resize-none"
    />
  </div>
</div>

{/* Comment Count */}
<div className="flex items-center justify-between py-2 border-b border-slate-100">
  <span className="text-sm text-slate-500">
    {story.fields?.comments?.length || 0} Comments
  </span>
  <button 
    className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1"
    onClick={() => navigate('/login')}
  >
    Sign in to comment
    <ArrowRightIcon className="w-4 h-4" />
  </button>
</div>

          {/* Example Comments - Replace with actual comments data */}
          <div className="pt-4 space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800">User Name</span>
                    <span className="text-sm text-slate-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    This is an example comment. Replace with real comment data.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isCommentsExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      <button
        onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
        className="w-full py-3 flex items-center justify-center gap-2 text-slate-600 hover:text-slate-800 border-t border-slate-100"
      >
        {isCommentsExpanded ? (
          <>Show less <ChevronUpIcon className="w-5 h-5" /></>
        ) : (
          <>View all comments <ChevronDownIcon className="w-5 h-5" /></>
        )}
      </button>
    </div>
  </div>
</div>
</div>
              {/* Bottom Section - Additional Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Perspectives */}
                {story.fields?.perspectives && (
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-slate-800 mb-4">
                      Different Perspectives
                    </h3>
                    <div className="space-y-4">
                      {story.fields.perspectives.map((perspective, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="font-medium text-slate-700 mb-2">
                            {perspective.fields.viewpoint}
                          </h4>
                          <p className="text-slate-600 text-sm">
                            {perspective.fields.summary}
                          </p>
                          <div className="mt-2 text-sm text-slate-500">
                            Source: {perspective.fields.source.fields.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                {story.fields?.timelineEvents && (
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-slate-600" />
                      Related Timeline
                    </h3>
                    <div className="space-y-4">
                      {story.fields.timelineEvents.map((event, index) => (
                        <div 
                          key={index}
                          className="relative pl-6 pb-4 border-l-2 border-slate-200 last:border-l-0"
                        >
                          <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-blue-600 -translate-x-[5px]" />
                          <div className="text-sm text-slate-500 mb-1">
                            {new Date(event.fields.date).toLocaleDateString()}
                          </div>
                          <h4 className="font-medium text-slate-700 mb-1">{event.fields.title}</h4>
                          <p className="text-slate-600 text-sm">{event.fields.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default StoryModal;