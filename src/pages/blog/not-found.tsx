import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="text-center py-24 px-6 sm:py-32 lg:px-8">
            <p className="text-base font-semibold leading-8 text-emerald-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Post not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the blog post you’re looking for.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                    to="/blog"
                    className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
                >
                    Back to blog
                </Link>
                <Link to="/" className="text-sm font-semibold text-gray-900 hover:text-gray-700">
                    Go to home <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </div>
    );
}
