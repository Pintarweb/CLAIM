import React from 'react';
import { Outlet } from 'react-router-dom';

export default function BlogLayout() {
    return (
        <div className="min-h-screen bg-sky-50/50 font-sans pt-24 pb-12 px-4 sm:px-8 md:px-16">
            <div className="max-w-7xl mx-auto relative">
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
