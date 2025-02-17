import React from 'react';

const Shop = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-800 mb-8">
        Support Our Mission
      </h1>
      
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h2 className="text-xl font-medium text-slate-700 mb-4">
          Why Support TruGoodBeautiful?
        </h2>
        <p className="text-slate-600 mb-6">
          Your donation helps us continue finding and sharing stories of progress, 
          highlighting the good in the world, and fostering a more balanced perspective 
          on current events.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-stone-50 p-6 rounded-lg">
            <h3 className="font-medium text-slate-700 mb-2">
              What Your Support Enables
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Expanded news coverage and analysis</li>
              <li>• Development of new features</li>
              <li>• Support for our research team</li>
              <li>• Sustainable operations</li>
            </ul>
          </div>
          
          <div className="bg-stone-50 p-6 rounded-lg">
            <h3 className="font-medium text-slate-700 mb-2">
              Our Commitment
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• 100% transparency in fund usage</li>
              <li>• Regular updates to supporters</li>
              <li>• Continued focus on quality</li>
              <li>• Dedication to our mission</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button 
            className="px-8 py-3 bg-green-600 text-white rounded-xl 
              hover:bg-green-700 transition-colors duration-200 
              font-medium shadow-sm hover:shadow-md"
          >
            Make a Donation
          </button>
          <p className="text-sm text-slate-500 mt-4">
            All donations are secure and encrypted
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-medium text-slate-700 mb-4">
          Other Ways to Support
        </h2>
        <div className="space-y-4 text-slate-600">
          <p>
            • Share our articles with your network
          </p>
          <p>
            • Follow us on social media
          </p>
          <p>
            • Sign up for our newsletter
          </p>
          <p>
            • Give us feedback on our coverage
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;