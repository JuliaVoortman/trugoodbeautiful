import React from 'react';
import { Dialog } from '@headlessui/react';

const StoryModal = ({ isOpen, onClose, story }) => {
  if (!story) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-xl shadow-xl">
          <div className="max-h-[90vh] overflow-y-auto">
            {/* Header with close button */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-800">
                {story.fields?.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-6">
              {/* Main image */}
              {story.fields?.image?.fields?.file?.url && (
                <img 
                  src={`https:${story.fields.image.fields.file.url}`}
                  alt={story.fields.image.fields.title || story.fields.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
              )}

              {/* Metadata */}
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 text-sm bg-stone-50 text-slate-600 rounded-full">
                  {story.fields?.categories?.[0]?.fields?.title || 'Uncategorized'}
                </span>
                <span className="text-green-600 text-sm font-medium flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                  {story.fields?.sentimentType?.fields?.title || 'Neutral'}
                </span>
              </div>

              {/* Story text */}
              <div className="prose max-w-none">
                <p className="text-slate-600">
                  {story.fields?.summary || 'No summary available'}
                </p>
              </div>

              {/* Why this matters */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900 mb-2">Why this matters</h3>
                <p className="text-blue-800">
                  {story.fields?.impact || 'Impact analysis not available'}
                </p>
              </div>

              {/* Timeline */}
              {story.fields?.relatedStories && (
                <div className="border-t border-slate-200 pt-4">
                  <h3 className="text-lg font-medium text-slate-800 mb-3">Related Stories</h3>
                  <div className="space-y-3">
                    {story.fields.relatedStories.map(relatedStory => (
                      <div key={relatedStory.sys.id} className="flex gap-3">
                        <div className="w-32 text-sm text-slate-500">
                          {new Date(relatedStory.fields.date).toLocaleDateString()}
                        </div>
                        <div className="flex-1">{relatedStory.fields.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {story.fields?.tags?.map(tag => (
                  <span key={tag.sys.id} className="px-3 py-1 text-sm bg-stone-50 text-slate-600 rounded-full">
                    {tag.fields.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default StoryModal;