import React from 'react';

const TrustSnippet: React.FC = () => {
  const comparisons = [
    {
      pain: "Distance Calculation",
      old: "Employees guess mileage using odometer readings.",
      new: "Exact GPS routing between origin and destination."
    },
    {
      pain: "Receipt Management",
      old: "Faded thermal receipts stapled to A4 paper.",
      new: "Digital snaps instantly tied to the specific trip."
    },
    {
      pain: "LHDN Audit Readiness",
      old: "Scrambling to build logs when an audit hits.",
      new: "Appendix A, B, and C generated in one click."
    },
    {
      pain: "Review Process",
      old: "Managers spend hours validating locations manually.",
      new: "System auto-flags discrepancies for 1-tap review."
    }
  ];

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-900 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 mb-6">
            <span className="text-slate-300 text-xs font-black tracking-widest uppercase">The ROI Breakdown</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            You're Either Losing Money or Taking Risk
          </h2>
          <p className="text-lg text-slate-400 font-medium max-w-3xl mx-auto">
            The cost of doing nothing is higher than you think. Unverified claims drain cash, while undocumented claims invite LHDN audit penalties.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-slate-800/80 backdrop-blur-md rounded-[2.5rem] border border-slate-700 overflow-hidden shadow-2xl">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-700">
            <div className="p-8 md:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-700 opacity-60">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-slate-400 font-black text-xl">✕</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-300 text-center">Without KlaimFlow</h3>
              <p className="text-slate-500 text-sm mt-2 text-center font-medium">The Manual Way</p>
            </div>

            <div className="p-8 md:p-10 flex flex-col items-center justify-center bg-emerald-900/20 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white text-center">With KlaimFlow</h3>
                <p className="text-emerald-300 text-sm mt-2 text-center font-bold uppercase tracking-wide">Automated & Secure</p>
              </div>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-slate-700/50">
            {comparisons.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 group hover:bg-slate-700/30 transition-colors">
                {/* Old Way */}
                <div className="p-6 md:p-8 flex items-start space-x-4 border-b md:border-b-0 md:border-r border-slate-700/50">
                  <div className="mt-1 flex-shrink-0 text-red-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{row.pain}</div>
                    <p className="text-slate-400 font-medium leading-relaxed">{row.old}</p>
                  </div>
                </div>

                {/* KlaimFlow Way */}
                <div className="p-6 md:p-8 flex items-start space-x-4 bg-emerald-900/10 relative">
                  <div className="mt-1 flex-shrink-0 text-emerald-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-500/70 font-black uppercase tracking-widest mb-1">{row.pain}</div>
                    <p className="text-emerald-50 font-bold leading-relaxed">{row.new}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSnippet;
