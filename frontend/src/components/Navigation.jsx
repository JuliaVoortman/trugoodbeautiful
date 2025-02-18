import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { path: '/', label: 'Articles', exact: true },
    { path: '/how-it-works', label: 'How it works' },
    { path: '/sources', label: 'Sources' },
    { path: '/sponsors', label: 'Sponsors' },
    { path: '/shop', label: 'Shop' }
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 bg-slate-900/50 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-end gap-2 sm:gap-8">
          {navItems.map(({ path, label, exact }) => (
       <NavLink 
       key={path}
       to={path}
       end={exact}
       className={({ isActive }) => `
         relative text-base sm:text-[22px] !text-white 
         sm:hover:!text-green-500/90 transition-colors
         border sm:border-0 border-white/30 rounded-md sm:rounded-none
         py-1 px-2.5 sm:px-0
         sm:underline sm:underline-offset-[3px] sm:decoration-white/60 sm:decoration-[0.5px]
         ${isActive ? 'bg-green-600 sm:bg-transparent border-green-600 sm:border-0 sm:!text-green-500' : ''}
         ${isActive ? `
           sm:before:absolute sm:before:left-[-12px] sm:before:top-1/2 sm:before:-translate-y-1/2 
           sm:before:w-1.5 sm:before:h-1.5 sm:before:bg-green-600 sm:before:rounded-full
           sm:before:content-['']
         ` : ''}
       `}
            >
              {({ isActive }) => (
                <div className="relative whitespace-nowrap">
                  {label}
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