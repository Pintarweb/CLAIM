import React from 'react';

const Overview = () => {
    return (
        <div>
            <header className="mb-8">
                <h2 className="text-3xl font-black text-slate-900">Dashboard</h2>
                <p className="text-slate-500 font-medium">Welcome back to ClaimFlow.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-xs font-bold uppercase text-slate-400 mb-2">Pending Review</h3>
                    <p className="text-3xl font-black text-slate-900">0</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-xs font-bold uppercase text-slate-400 mb-2">Approved This Month</h3>
                    <p className="text-3xl font-black text-green-600">RM 0.00</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-xs font-bold uppercase text-slate-400 mb-2">Active Users</h3>
                    <p className="text-3xl font-black text-blue-600">1</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center py-20">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Claims Yet</h3>
                <p className="text-slate-500 mb-6 max-w-sm mx-auto">You haven't uploaded any receipts or created any claims. Start by creating your first claim.</p>
                <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all">
                    Create New Claim
                </button>
            </div>
        </div>
    );
};

export default Overview;
