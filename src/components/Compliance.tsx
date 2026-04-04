import React from 'react';

const Compliance: React.FC = () => {
  return (
    <section className="py-24 bg-emerald-50 border-b border-emerald-100 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <div className="inline-block px-4 py-1.5 bg-emerald-600 rounded-full text-[10px] font-black tracking-widest uppercase mb-8 text-white shadow-md">
          Tax Exemption Limit
        </div>

        <h2 className="text-4xl md:text-5xl font-black mb-8 text-slate-900 tracking-tight">
          Bonus: Go Beyond <span className="text-emerald-600">RM6,000</span> Safely
        </h2>

        <p className="text-xl text-slate-700 font-medium mb-12 leading-relaxed">
          Most companies cap mileage claims at RM6,000 per employee because their documentation breaks down, exposing them to audit risks.
        </p>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-emerald-100 text-left relative z-20">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Bulletproof Proof</h3>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">
                KlaimFlow ensures you always have the exact digital proof—times, routes, and receipts—to confidently justify higher legitimate claims to LHDN without the fear of penalties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-300 rounded-full blur-3xl opacity-30"></div>
    </section>
  );
};

export default Compliance;
