
import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
            <p className="text-slate-500 mb-8">Last Updated: February 2026</p>

            <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                <p>This Privacy Policy describes how ClaimFlow ("we", "us", or "our") collects, uses, and discloses your personal information when you use our website and services.</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
                <p>We collect information that you provide to us directly, such as when you fill out a form, request a demo, or communicate with us. This may include your name, email address, company name, and phone number.</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
                <p>We use the information we collect to Provide, maintain, and improve our services; Process transactions and send related information; Send you technical notices, updates, security alerts, and support messages; and Respond to your comments, questions, and requests.</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Data Security</h2>
                <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at support@claimflow.my.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
