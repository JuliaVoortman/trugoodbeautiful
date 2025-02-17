import React, { useEffect, useState } from 'react';
import { getPage, getSources } from '../lib/contentful';

const Sources = () => {
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
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse flex justify-center">
          <div className="h-4 bg-slate-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-center text-slate-600">Content not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">

      {/* Sources Section */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-medium text-slate-700 mb-6">Our Sources</h2>
        <div className="relative">
          <div className="overflow-x-auto sm:overflow-visible">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200">
  <thead>
    <tr className="bg-stone-50 border-b border-stone-200">
      <th scope="col" className="px-4 sm:px-6 py-4 text-left text-xs uppercase tracking-wider font-medium text-slate-500 w-24 sm:w-36">
        Source
      </th>
      <th scope="col" className="px-4 sm:px-6 py-4 text-left text-xs uppercase tracking-wider font-medium text-slate-500">
        Description
      </th>
      <th scope="col" className="px-4 sm:px-6 py-4 text-left text-xs uppercase tracking-wider font-medium text-slate-500 w-20 sm:w-32">
        Score
      </th>
      <th scope="col" className="px-4 sm:px-6 py-4 text-left text-xs uppercase tracking-wider font-medium text-slate-500 w-28 sm:w-40">
        AllSides bias
      </th>
    </tr>
  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {sources.map((source) => (
                      <tr key={source.sys.id} className="hover:bg-blue-600/10 transition-colors duration-50">
                        <td className="px-6 py-4">
                          <div className="h-8 flex items-center">
                            {source.fields.logo && (
                              <img 
                                src={`https:${source.fields.logo.fields.file.url}`}
                                alt={source.fields.name}
                                className="h-6 w-auto object-contain"
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 align-middle">
                          <div>
                            <a 
                              href={source.fields.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-slate-900 hover:text-green-600 transition-colors duration-150 font-medium"
                            >
                              {source.fields.name}
                            </a>
                            <p className="text-sm text-slate-600 mt-1">
                              {source.fields.description}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 align-middle">
                          <span className="text-slate-600">
                            {source.fields.score}
                          </span>
                        </td>
                        <td className="px-6 py-4 align-middle">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-stone-50 text-slate-800">
                            {source.fields.biasRating?.fields?.title || 'Unknown'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sources;