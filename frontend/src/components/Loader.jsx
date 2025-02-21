import React from 'react';
import '../Loader.css';

const Loader = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="loader"></div>
      {message && <div className="text-lg text-slate-600">{message}</div>}
    </div>
  );
};

export default Loader;