import React from 'react';

const Hero = () => (
  <div className="relative h-60 overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-bottom z-0"
      style={{ 
        backgroundImage: 'url("/new-landscape.jpg")',
        filter: 'brightness(0.4)'
      }}
    />
    <div className="pt-10 relative z-10 h-full flex justify-center items-center">
      <div className="text-center">
        <img 
          src="/logo.svg" 
          alt="TruGoodBeautiful Logo" 
          className="h-20 mx-auto filter"
        />
        <p className="text-lg text-white mt-2">
          Finding light in the headlines
        </p>
      </div>
    </div>
  </div>
);

export default Hero;