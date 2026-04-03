import React from 'react';

const Features: React.FC = () => {
  const pillars = [
    {
      title: "1. Verify Every Trip",
      features: ["GPS tracking", "Real routes", "No guessing"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "2. Eliminate Fake Claims",
      features: ["No manual manipulation", "Data-backed distances", "Automated math"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "3. Automate Documentation",
      features: ["Receipts + trip logs", "No missing info", "Digital storage"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "4. Audit-Ready Reports",
      features: ["LHDN compliant", "One-click export", "Appendix A,B,C ready"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">KlaimFlow Fixes the Entire Claim System</h2>
          <p className="text-slate-600 font-bold max-w-2xl mx-auto text-lg leading-relaxed">We replace broken manual processes with an automated engine that verifies, documents, and reports every expense.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col group">
              <div className="mb-6 w-14 h-14 rounded-2xl bg-white shadow-sm text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{p.title}</h3>
              <ul className="space-y-3">
                {p.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm font-medium text-slate-700">
                    <svg className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
