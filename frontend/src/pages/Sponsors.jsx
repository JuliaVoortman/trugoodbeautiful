import React, { useEffect, useState } from 'react';
import { getSponsors } from '../lib/contentful';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState({
    founding: [],
    supporting: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const sponsorsData = await getSponsors();
        // Group sponsors into two tiers
        const groupedSponsors = sponsorsData.reduce((acc, sponsor) => {
          const tier = sponsor.fields.founderPartner ? 'founding' : 'supporting';
          acc[tier].push(sponsor);
          return acc;
        }, { founding: [], supporting: [] });
        
        setSponsors(groupedSponsors);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-medium text-slate-700 mb-6">
        Our Sponsors
      </h1>
      
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        {/* Introduction */}
        <div className="prose prose-slate lg:prose-lg max-w-none">
          <p className="text-slate-600 text-lg">
          We're grateful for partners who champion optimism. They join us in a mission to inspire hope and action through balanced, positive news.
          </p>
        </div>

        {/* Sponsorship Tiers */}
        <div className="mt-12 space-y-12">
          {/* Founding Partners */}
          {sponsors.founding.length > 0 && (
            <div>
              <h2 className="text-xl font-medium text-slate-900 mb-6">
                Founding Partners
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {sponsors.founding.map((sponsor) => (
                  <div key={sponsor.sys.id} className="flex items-center justify-center">
                    <a 
                      href={sponsor.fields.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-75 transition-opacity"
                    >
                      <img
                        src={`https:${sponsor.fields.logo.fields.file.url}`}
                        alt={sponsor.fields.name}
                        className="h-16 w-auto object-contain"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Supporting Partners */}
          {sponsors.supporting.length > 0 && (
            <div>
              <h2 className="text-xl font-medium text-slate-900 mb-6">
                Supporting Partners
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {sponsors.supporting.map((sponsor) => (
                  <div key={sponsor.sys.id} className="flex items-center justify-center">
                    <a 
                      href={sponsor.fields.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-75 transition-opacity"
                    >
                      <img
                        src={`https:${sponsor.fields.logo.fields.file.url}`}
                        alt={sponsor.fields.name}
                        className="h-12 w-auto object-contain"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

{/* Call to Action */}
<div className="mt-16 bg-stone-50 rounded-lg p-6">
  <h3 className="text-lg font-medium text-slate-900 mb-2">
    Become a Sponsor
  </h3>
  <p className="text-slate-600 mb-4">
    Support our mission to bring balanced news and foster constructive dialogue.
  </p>
  <a 
    href="/support" 
    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors duration-150"
  >
    Learn More About Sponsorship
  </a>
</div>
      </div>
    </div>
  );
};

export default Sponsors;