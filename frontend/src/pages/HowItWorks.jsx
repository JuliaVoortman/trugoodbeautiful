import React, { useEffect, useState } from 'react';
import { getPage } from '../lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const HowItWorks = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [page] = await Promise.all([
          getPage('How it works'),
        ]);
        
        if (page?.fields) {
          setPageContent(page);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse flex justify-center">
          <div className="h-4 bg-slate-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-center text-slate-600">Content not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="bg-white rounded-xl shadow-sm p-8">
       <h1 className="text-xl font-medium text-slate-700 mb-6">
          {pageContent.fields.title}
        </h1>
        
        {/* First Content Block */}
        <article className="prose prose-slate lg:prose-lg max-w-none">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: documentToHtmlString(pageContent.fields.content)
            }}
          />
        </article>

        {/* Callout Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-stone-50 rounded-lg p-6">
            <div 
              className="prose prose-slate text-slate-600"
              dangerouslySetInnerHTML={{ 
                __html: documentToHtmlString(pageContent.fields.callout1)
              }}
            />
          </div>
          <div className="bg-stone-50 rounded-lg p-6">
            <div 
              className="prose prose-slate text-slate-600"
              dangerouslySetInnerHTML={{ 
                __html: documentToHtmlString(pageContent.fields.callout2)
              }}
            />
          </div>
        </div>

        {/* Second Content Block */}
        <article className="prose prose-slate text-slate-600 lg:prose-lg max-w-none mt-8">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: documentToHtmlString(pageContent.fields.content2)
            }}
          />
        </article>
      </div>

    </div>
  );
};

export default HowItWorks;