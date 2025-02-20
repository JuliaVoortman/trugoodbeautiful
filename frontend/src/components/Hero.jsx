import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <div className="relative h-60 overflow-hidden -mb-8">
    <div 
      className="absolute inset-0 bg-cover bg-bottom z-[1]"
      style={{ 
        backgroundImage: 'url("/new-landscape.jpg")',
        filter: 'brightness(0.4)'
      }}
    />
    <div className="pt-6 relative z-[2] h-full flex justify-center items-center">
      <div className="text-center">
        <Link to="/">
          <img 
            src="/logo.svg" 
            alt="TruGoodBeautiful Logo" 
            className="h-20 w-72 filter object-contain hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>
    </div>
  </div>
);

export default Hero;