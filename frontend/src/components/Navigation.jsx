import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { path: '/', label: 'Articles', exact: true },
    { path: '/how-it-works', label: 'How it works' },
    { path: '/sponsors', label: 'Sponsors' },
    { path: '/donate', label: 'Donate' }
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 bg-slate-900/50 backdrop-blur-sm z-50 shadow-lg shadow-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-end space-x-8">
          {navItems.map(({ path, label, exact }) => (
            <Link 
              key={path}
              to={path}
              end={exact}
              className={({ isActive }) => `
                relative z-50
                !text-white hover:!text-slate-200 
                transition-colors underline 
                cursor-pointer py-2 px-1
              `}
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full" />
                  )}
                </>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;