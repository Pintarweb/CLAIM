
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center transform rotate-12">
              <span className="text-white font-bold text-xs -rotate-12">C</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 uppercase">
              Claim<span className="text-blue-600">Flow</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-500">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-6 rounded-full transition-all shadow-md shadow-blue-200 active:scale-95">
            Claim Your Toolkit
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
