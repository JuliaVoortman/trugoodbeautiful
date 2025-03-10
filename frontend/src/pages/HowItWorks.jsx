import React, { useEffect, useState } from 'react';
import { getPage, getSources } from '../lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const HowItWorks = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sources, setSources] = useState([]);
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [page, sourcesData] = await Promise.all([
          getPage('How it works'),
          getSources()
        ]);
        
        if (page?.fields) {
          setPageContent(page);
        }
        setSources(sourcesData);
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
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-xl font-medium text-slate-700 mb-6">
          {pageContent.fields.title}
        </h1>
        
        {/* First Content Block */}
        <article className="prose prose-slate text-slate-600 lg:prose-lg max-w-none">
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

      {/* Sources Table Section */}
       <div className="max-w-7xl lg:max-w-4xl mx-auto px-2 sm:px-3 md:px-4 py-4 space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
        <h1 className="text-xl font-medium text-slate-700 mb-6">
          Our sources
        </h1>
        
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full divide-y divide-slate-200 border border-slate-200 rounded-lg table-fixed overflow-hidden">
            <thead>
              <tr className="bg-stone-50">
                <th className="px-2 sm:px-3 py-3 text-left text-[10px] sm:text-sm uppercase tracking-wide text-slate-500 w-[15%] font-normal">
                  Source
                </th>
                <th className="px-2 sm:px-3 py-3 text-left text-[10px] sm:text-sm uppercase tracking-wide text-slate-500 w-[45%] font-normal">
                  Description
                </th>
                <th className="px-2 sm:px-3 py-3 text-left text-[10px] sm:text-sm uppercase tracking-wide text-slate-500 w-[15%] font-normal">
                  Score
                </th>
                <th className="px-2 sm:px-3 py-3 text-left text-[10px] sm:text-sm uppercase tracking-wide text-slate-500 w-[25%] font-normal">
                  <a href="https://www.allsides.com/media-bias/ratings" className="underline hover:text-green-600 transition-colors">
                    AllSides
                  </a> rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {sources.map((source) => (
                <tr key={source.sys.id} className="hover:bg-blue-600/10 transition-colors duration-150">
                  <td className="px-2 sm:px-3 py-4 align-middle">
                    <div className="flex items-center justify-center">
                      {source.fields.logo && (
                        <img 
                          src={`https:${source.fields.logo.fields.file.url}`}
                          alt={source.fields.name}
                          className="h-6 w-auto object-contain"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-2 sm:px-3 py-4 align-middle">
                    <div className="flex flex-col">
                      <a 
                        href={source.fields.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-900 hover:text-green-600 transition-colors duration-150 font-medium text-sm sm:text-base md:text-lg"
                      >
                        {source.fields.name}
                      </a>
                      <p className="text-sm md:text-base text-slate-600 mt-1 line-clamp-8">
                        {source.fields.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-2 sm:px-3 py-4">
                    <div className="flex items-center justify-start h-full">
                      <span className="text-slate-600 text-sm sm:text-base md:text-lg">
                        {source.fields.score}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-3 py-4">
                    <div className="flex items-center h-full">
                      <span className="inline-flex items-center px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm md:text-base font-medium bg-stone-50 text-slate-800 whitespace-nowrap">
                        {source.fields.biasRating?.fields?.title || 'Unknown'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HowItWorks;