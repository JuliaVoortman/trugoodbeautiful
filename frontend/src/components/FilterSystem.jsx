// src/components/FilterSystem.js
import React from 'react';

// components/FilterSystem.js
const FilterSystem = ({ articles, onFilterChange }) => {
  return (
    <select 
      onChange={(e) => {
        const value = e.target.value;
        const filtered = value === 'all' 
          ? articles 
          : articles.filter(article => article.fields.region === value);
        onFilterChange(filtered);
      }}
      className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
    >
      <option value="all">All Regions</option>
      <option value="northAmerica">North America</option>
      <option value="europe">Europe</option>
      <option value="asia">Asia</option>
      <option value="africa">Africa</option>
      <option value="southAmerica">South America</option>
      <option value="oceania">Oceania</option>
    </select>
  );
};

export default FilterSystem;

