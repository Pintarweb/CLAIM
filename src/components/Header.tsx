import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getAllPosts, BlogPost } from '../lib/markdown';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllPosts().then(posts => setLatestPosts(posts.slice(0, 3)));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBlogDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleScroll = (elementId: string) => {
    if (location.pathname === '/') {
      document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: elementId } });
    }
  };

  const isSuccess = new URLSearchParams(location.search).get('success') === 'true';

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleScroll('hero-top')}>
            <img src="/logo-full_no_bg.png" alt="KlaimFlow" className="h-48 w-auto drop-shadow-sm" />
          </div>

          {!isSuccess && (
            <>
              <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-500">
                <button onClick={() => handleScroll('features')} className="hover:text-emerald-600 transition-colors">Features</button>
                <button onClick={() => handleScroll('faq')} className="hover:text-emerald-600 transition-colors">FAQ</button>

                {/* Blog Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsBlogDropdownOpen(!isBlogDropdownOpen)}
                    className="flex items-center hover:text-emerald-600 transition-colors focus:outline-none"
                  >
                    Blog
                    <svg className={`ml-1 flex-shrink-0 h-4 w-4 transition-transform ${isBlogDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {isBlogDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden transform transition-all border border-slate-100">
                      <div className="py-2">
                        {latestPosts.map(post => (
                          <Link
                            key={post.meta.slug}
                            to={`/blog/${post.meta.slug}`}
                            className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors border-b border-slate-50 last:border-0"
                            onClick={() => setIsBlogDropdownOpen(false)}
                          >
                            <div className="font-semibold mb-1 line-clamp-1">{post.meta.title}</div>
                            <div className="text-slate-500 text-xs line-clamp-2">{post.meta.description}</div>
                          </Link>
                        ))}
                      </div>
                      <div className="bg-slate-50 border-t border-slate-100">
                        <Link
                          to="/blog"
                          className="block px-4 py-3 text-sm text-emerald-600 hover:text-emerald-800 font-semibold text-center transition-colors"
                          onClick={() => setIsBlogDropdownOpen(false)}
                        >
                          View All Posts &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleScroll('mission-form')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2 px-6 rounded-full transition-all shadow-md shadow-emerald-200 active:scale-95 ml-4"
              >
                Get Free Audit Review
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
