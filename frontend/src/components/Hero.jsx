import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

const Hero = () => {
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'hero',
          'fields.name': 'Main'
        });

        if (response.items[0]?.fields?.image?.fields?.file?.url) {
          setHeroImage(`https:${response.items[0].fields.image.fields.file.url}`);
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
      }
    };

    fetchHeroContent();
  }, []);

  return (
    <div className="relative h-60 overflow-hidden -mb-8">
      <div 
        className="absolute inset-0 bg-cover bg-bottom z-[1]"
        style={{ 
          backgroundImage: `url("${heroImage || '/new-landscape.jpg'}")`,
          filter: 'brightness(0.4)'
        }}
      />
      <div className="pt-6 relative z-[2] h-full flex justify-center items-center">
        <div className="text-center">
          <Link to="/">
            <img 
              src="/logo.svg" 
              alt="trugoodbeautiful logo" 
              className="h-20 w-72 filter object-contain hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;