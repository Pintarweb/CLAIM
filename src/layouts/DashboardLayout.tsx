import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const navItems = [
        { label: 'Overview', path: '/dashboard' },
        { label: 'My Claims', path: '/dashboard/claims' },
        { label: 'Receipts', path: '/dashboard/receipts' },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-slate-900 z-50 px-4 py-3 flex items-center justify-between shadow-md">
                <h1 className="text-xl font-black text-white">ClaimFlow</h1>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white p-2"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    )}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 bg-slate-900 text-white fixed h-full z-40 transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:block pt-16 md:pt-0
            `}>
                <div className="p-8 h-full flex flex-col">
                    <h1 className="text-2xl font-black mb-8 hidden md:block">ClaimFlow</h1>
                    <nav className="space-y-2 flex-grow">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-auto">
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 border border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-slate-600 transition-colors text-sm font-bold"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 flex-1 p-4 md:p-8 pt-20 md:pt-8 transition-all">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
