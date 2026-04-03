import React from 'react';

const TrustSnippet: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            You're Either Losing Money or Taking Risk
          </h2>
          <p className="text-xl text-slate-400 font-medium max-w-3xl mx-auto">
            The cost of doing nothing is higher than you think. Unverified claims drain cash, while undocumented claims invite audit penalties.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Without KlaimFlow */}
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Without KlaimFlow</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1 font-bold">✕</span>
                <span className="text-slate-300 font-medium">Overpayments on inflated mileage estimates</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1 font-bold">✕</span>
                <span className="text-slate-300 font-medium">Manual errors from tedious Excel data entry</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1 font-bold">✕</span>
                <span className="text-slate-300 font-medium">Audit exposure from missing thermal receipts</span>
              </li>
            </ul>
          </div>

          {/* With KlaimFlow */}
          <div className="bg-blue-600 p-8 rounded-3xl border border-blue-500 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">With KlaimFlow</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-200 mr-3 mt-1 font-bold">✓</span>
                  <span className="text-blue-50 font-medium">Controlled costs with GPS-verified distance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-3 mt-1 font-bold">✓</span>
                  <span className="text-blue-50 font-medium">Clean automated records and extraction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-3 mt-1 font-bold">✓</span>
                  <span className="text-blue-50 font-medium">Full visibility and 7-year cloud audit trail</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSnippet;
