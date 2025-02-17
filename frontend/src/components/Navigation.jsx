import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { path: '/', label: 'Articles', exact: true },
    { path: '/how-it-works', label: 'How it works' },
    { path: '/sponsors', label: 'Sponsors' },
    { path: '/shop', label: 'Shop' }
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 bg-slate-900/50 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-end space-x-8">
          {navItems.map(({ path, label, exact }) => (
            <NavLink 
              key={path}
              to={path}
              end={exact}
              className={({ isActive }) => `
                relative !text-white hover:!text-green-500/90
                transition-colors underline cursor-pointer 
                py-1 px-1 ${isActive ? 'font-medium' : ''}
              `}
            >
              {({ isActive }) => (
                <div className="relative">
                  {label}
                  {isActive && (
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full" />
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;