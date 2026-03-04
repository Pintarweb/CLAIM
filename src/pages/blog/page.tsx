import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { getAllPosts, BlogPost } from '../../lib/markdown';

export default function BlogIndex() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllPosts().then(data => {
            setPosts(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="text-center py-20 animate-pulse text-sky-600 font-bold">Loading posts...</div>;
    }

    return (
        <>
            <Helmet>
                <title>Articles | ClaimFlow Blog</title>
                <meta name="description" content="Read the latest news, updates, and B2B insights from ClaimFlow." />
                <link rel="canonical" href="https://claimflow.com/blog" />
                <meta property="og:title" content="Articles | ClaimFlow Blog" />
                <meta property="og:description" content="Read the latest news, updates, and B2B insights from ClaimFlow." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://claimflow.com/blog" />
                <meta property="og:image" content="https://claimflow.com/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            {/* Header */}
            <header className="mb-12 border-b border-sky-100 pb-8">
                <h1 className="text-slate-900 text-6xl font-extrabold tracking-tighter">
                    Articles
                </h1>
            </header>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-sky-100/20">
                {posts.map((post) => (
                    <Link
                        to={`/blog/${post.meta.slug}`}
                        key={post.meta.slug}
                        className="group flex flex-col justify-between p-8 border border-sky-100 bg-white hover:bg-sky-50 transition-all duration-300 cursor-pointer h-[320px] shadow-sm hover:shadow-md"
                    >
                        <div>
                            <p className="text-sky-600 text-sm mb-4 font-semibold uppercase tracking-wider">
                                {post.meta.author} • {new Date(post.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                            <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight max-w-[280px] line-clamp-3">
                                {post.meta.title}
                            </h2>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sky-100 grayscale group-hover:grayscale-0 transition-all shadow-sm">
                                <img
                                    src={post.meta.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.meta.author}`}
                                    alt={post.meta.author}
                                    className="w-full h-full object-cover bg-sky-100"
                                    onError={(e) => { (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"; }}
                                />
                            </div>
                            <div className="flex items-center gap-2 group/link">
                                <span className="text-sky-700 text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                                    read more
                                </span>
                                <ArrowRight className="text-sky-600 w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {posts.length === 0 && (
                <div className="text-center py-20 text-sky-600 font-bold bg-white rounded-2xl border border-sky-100 shadow-sm mt-8">
                    <p className="text-lg">No posts published yet.</p>
                </div>
            )}
        </>
    );
}
