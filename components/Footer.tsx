
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-[8px]">C</span>
          </div>
          <span className="text-xs font-black tracking-widest text-slate-900 uppercase">
            Claim<span className="text-blue-600">Flow</span>
          </span>
        </div>

        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          © 2025 ClaimFlow Malaysia. Built for Tourism Excellence.
        </div>

        <div className="flex space-x-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
