// src/components/HomePage.js
import React from 'react';
import ContinentsMap from './ContinentsMap'; // Adjust the path as needed

function HomePage() {
  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      {/* Headline News Story (2/3 width on medium screens and larger) */}
      <div className="md:w-2/3 border rounded p-4">
        <h2 className="text-2xl font-semibold mb-4">Headline News Story</h2>
        <p className="text-gray-700">
          This is where your headline news story content will go. You can include images, text, and other elements here.
        </p>
        {/* Add more content here... */}
      </div>

      {/* Map Component (1/3 width on medium screens and larger) */}
      <div className="md:w-1/3 border rounded p-4">
        <ContinentsMap />
      </div>
    </div>
  );
}

export default HomePage;