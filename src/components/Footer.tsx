
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-8 pb-4 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
        <div className="flex items-center space-x-2">
          <img src="/logo-full_no_bg.png" alt="KlaimFlow" className="h-36 w-auto opacity-80 hover:opacity-100 transition-opacity" />
        </div>

        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          © {new Date().getFullYear()} KlaimFlow Malaysia. Built for Business Excellence.
        </div>

        <div className="flex space-x-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <Link to="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
