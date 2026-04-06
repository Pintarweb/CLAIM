import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
    order_index: number;
}

const FAQ: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [openId, setOpenId] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('General FAQ');

    useEffect(() => {
        async function fetchFaqs() {
            const { data, error } = await supabase
                .from('faqs')
                .select('*')
                .eq('is_active', true)
                .order('order_index', { ascending: true });

            if (!error && data) {
                setFaqs(data);
                // If there's data, set active category to the first available category if 'General FAQ' isn't found
                const cats = Array.from(new Set(data.map(f => f.category)));
                if (cats.length > 0 && !cats.includes('General FAQ')) {
                    setActiveCategory(cats[0]);
                }
            }
        }
        fetchFaqs();
    }, []);

    // Ensure categories exist and are ordered logically
    const categories = Array.from(new Set(faqs.map(f => f.category)));
    const visibleFaqs = faqs.filter(f => f.category === activeCategory);

    const renderAnswer = (htmlContent: string) => {
        // A quick way to handle bold logic and line breaks without a full markdown parser
        let parsedContent = htmlContent
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');

        return { __html: parsedContent };
    };

    return (
        <section id="faq" className="py-24 bg-slate-50 border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Everything you need to know about KlaimFlow, LHDN audits, and the RM6,000 allowance exemption.
                    </p>
                </div>

                {/* Category Tabs */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setOpenId(null);
                                }}
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${activeCategory === cat
                                        ? 'bg-emerald-600 text-white shadow-md scale-105'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-600 hover:text-emerald-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                <div className="space-y-4">
                    {visibleFaqs.map((faq) => (
                        <div key={faq.id} className="bg-white border text-left border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-[shadow,border-color]">
                            <button
                                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none group"
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                            >
                                <span className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors pr-4 leading-snug">{faq.question}</span>
                                <svg
                                    className={`flex-shrink-0 w-6 h-6 text-slate-400 transform transition-transform duration-200 ${openId === faq.id ? 'rotate-180 text-emerald-600' : ''}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                            >
                                <div
                                    className="px-6 pb-6 text-slate-600 leading-relaxed font-medium"
                                    dangerouslySetInnerHTML={renderAnswer(faq.answer)}
                                />
                            </div>
                        </div>
                    ))}
                    {faqs.length === 0 && (
                        <div className="text-center text-slate-500 py-10 font-medium">Loading FAQs...</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
