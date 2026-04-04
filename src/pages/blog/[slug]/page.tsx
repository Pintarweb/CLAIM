import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, BlogPost } from '../../../lib/markdown';
import { supabase } from '../../../lib/supabase';
import NotFound from '../not-found';

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agencyName, setAgencyName] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        if (slug) {
            getPostBySlug(slug).then(data => {
                setPost(data);
                setLoading(false);
            });
        }
    }, [slug]);

    const handleJoinClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
        setSubmitSuccess(false);
        setSubmitError('');
    };

    const handleSubmitToken = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError('');

        try {
            const { error } = await supabase
                .from('leads')
                .insert([
                    { agency_name: agencyName, email: email, interested_in_pilot: true }
                ]);

            if (error) throw error;

            // Trigger internal notification for the team and auto-reply for the lead
            await supabase.functions.invoke('notify-lead', {
                body: { email, agency_name: agencyName }
            });

            setSubmitSuccess(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setAgencyName('');
                setEmail('');
            }, 3000);
        } catch (err: any) {
            setSubmitError(err.message || 'Failed to submit. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center py-20 animate-pulse text-gray-500">Loading post...</div>;
    }

    if (!post) {
        return <NotFound />;
    }

    return (
        <>
            <Helmet>
                <title>{post.meta.title} | KlaimFlow Blog</title>
                <meta name="description" content={post.meta.description} />
                <link rel="canonical" href={`https://klaimflow.com/blog/${post.meta.slug}`} />
                <meta property="og:title" content={`${post.meta.title} | KlaimFlow Blog`} />
                <meta property="og:description" content={post.meta.description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://klaimflow.com/blog/${post.meta.slug}`} />
                <meta property="og:image" content={post.meta.image_url ? `https://klaimflow.com${post.meta.image_url}` : "https://klaimflow.com/og-image.jpg"} />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "headline": "${post.meta.title}",
                            "image": "${post.meta.image_url ? `https://klaimflow.com${post.meta.image_url}` : "https://klaimflow.com/og-image.jpg"}",
                            "description": "${post.meta.description}",
                            "author": {
                                "@type": "Person",
                                "name": "${post.meta.author}"
                            },
                            "datePublished": "${new Date(post.meta.date).toISOString()}",
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": "https://klaimflow.com/blog/${post.meta.slug}"
                            }
                        }
                    `}
                </script>
            </Helmet>
            <article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mt-8 md:mt-12">
                <header className="bg-slate-50 border-b border-slate-200 px-6 py-10 sm:px-12 sm:py-16 text-center">
                    <Link to="/blog" className="inline-flex items-center text-sm font-bold tracking-wide uppercase text-emerald-600 hover:text-emerald-800 mb-8 transition-colors group">
                        <span aria-hidden="true" className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to all posts
                    </Link>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                        {post.meta.title}
                    </h1>
                    <div className="flex justify-center items-center gap-3 text-slate-500 font-medium">
                        {post.meta.avatar_url && (
                            <img src={post.meta.avatar_url} alt={post.meta.author} className="w-8 h-8 rounded-full border border-slate-200 object-cover bg-white" />
                        )}
                        <span>By {post.meta.author}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <time dateTime={post.meta.date}>
                            {new Date(post.meta.date).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </time>
                    </div>
                </header>

                {post.meta.image_url && (
                    <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden border-b border-slate-200">
                        <img
                            src={post.meta.image_url}
                            alt={post.meta.title}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                )}

                <div className="px-6 py-10 sm:px-12 sm:py-12">
                    <div className="prose prose-lg prose-slate max-w-none 
                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 
                            prose-h1:text-4xl prose-h1:mb-8 
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                            prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
                            prose-a:font-semibold prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:text-slate-700
                            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:text-slate-700
                            prose-li:mb-2
                            prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-6 
                            prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-slate-600 prose-blockquote:bg-slate-50 prose-blockquote:rounded-r-xl
                            prose-strong:font-extrabold prose-strong:text-slate-900"
                    >
                        <ReactMarkdown>
                            {post.content.replace(/\\n/g, '\n')}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-sky-50 border-t border-sky-100 p-8 sm:p-12 text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Ready to automate your mileage?
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
                        Stop dealing with manual odometer readings and Excel spreadsheets. Join the KlaimFlow pilot program and digitally transform your expense management today.
                    </p>
                    <button
                        onClick={handleJoinClick}
                        className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
                    >
                        Join the Pilot Program
                    </button>
                </div>
            </article>

            {/* Pilot Registration Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Pilot Registration</h3>
                            <p className="text-slate-600">Enter your details and our team will be in touch shortly.</p>
                        </div>

                        {submitSuccess ? (
                            <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h4 className="text-lg font-bold text-green-900 mb-1">Registration Received!</h4>
                                <p className="text-green-700 mb-0">We will reach out to you via email soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitToken} className="space-y-4">
                                {submitError && (
                                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                                        {submitError}
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="agency" className="block text-sm font-semibold text-slate-700 mb-1">Agency / Company Name</label>
                                    <input
                                        id="agency"
                                        type="text"
                                        required
                                        value={agencyName}
                                        onChange={(e) => setAgencyName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
                                        placeholder="Acme Corp"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Work Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
                                        placeholder="jane@acme.com"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex justify-center items-center gap-2 shadow-sm disabled:opacity-70"
                                >
                                    {submitting ? 'Submitting...' : 'Request Access'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
