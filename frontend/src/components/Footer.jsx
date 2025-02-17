import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ className }) => {
  const footerLinks = [
    { path: '/', label: 'Articles' },
    { path: '/how-it-works', label: 'How it works' },
    { path: '/sponsors', label: 'Sponsors' },
    { path: '/shop', label: 'Shop' },
    { path: '/sources', label: 'Sources' },
    { path: '/terms-and-conditions', label: 'Terms & conditions' }
  ];

  return (
    <footer className="w-full bg-stone-300 py-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation Links */}
        <div className="mb-4">
          <nav className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-x-2 gap-y-3 text-sm">
            {footerLinks.map((link, index) => (
              <React.Fragment key={link.path}>
                <Link
                  to={link.path}
                  className="hover:text-gray-600 transition-colors underline text-center"
                >
                  {link.label}
                </Link>
                {index < footerLinks.length - 1 && (
                  <span className="hidden sm:inline text-gray-500">•</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
        
        {/* Credits Section */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            We run on 
            <a 
              href="https://www.contentful.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <img 
                src="/contentful_logo.svg" 
                alt="Contentful" 
                className="h-5 inline-block"
              />
            </a>
          </div>
          <span className="text-gray-400 text-sm">|</span>
          <a 
            href="https://www.linkedin.com/in/juliavoortman/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            Made with ❤️
          </a>
        </div>
      </div>
    </footer>
  );
};
  
export default Footer;