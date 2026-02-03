
import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Terms of Service</h1>
            <p className="text-slate-500 mb-8">Last Updated: February 2026</p>

            <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                <p>Please read these Terms of Service ("Terms") carefully before using the ClaimFlow website and services operated by ClaimFlow ("us", "we", or "our").</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
                <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Use of Service</h2>
                <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account and password.</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Intellectual Property</h2>
                <p>The Service and its original content, features, and functionality are and will remain the exclusive property of ClaimFlow and its licensors.</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Termination</h2>
                <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Changes to Terms</h2>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
            </div>
        </div>
    );
};

export default TermsOfService;
