import React from 'react';

const Features: React.FC = () => {
  const pillars = [
    {
      title: "Verify Every Trip",
      desc: "No more guessing games. We capture exact GPS coordinates, calculating precise map distances to eliminate mileage padding.",
      features: ["GPS route tracking", "Immutable data", "Zero manual manipulation"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Automate Documentation",
      desc: "Stop chasing thermal receipts. Staff simply snap a photo, and KlaimFlow securely attaches it to the specific trip log forever.",
      features: ["Receipt scanning", "No missing info", "7-year cloud storage"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Audit-Ready Reports",
      desc: "When LHDN knocks, you're ready. Generate the exact Appendix A, B, and C formats required for the RM6,000 tax exemption instantly.",
      features: ["LHDN compliant", "One-click export", "Appendix A,B,C ready"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-24 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24 relative">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight relative z-10">KlaimFlow Fixes the Entire Claim System</h2>
          <p className="text-slate-600 font-bold max-w-2xl mx-auto text-lg leading-relaxed relative z-10">We replace broken manual processes with an automated engine that verifies, documents, and reports every expense.</p>
        </div>

        <div className="space-y-32">
          {pillars.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}>
              <div className="lg:w-1/2">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-emerald-50 shadow-sm text-emerald-600 flex items-center justify-center border border-emerald-100">
                  {p.icon}
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{p.title}</h3>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">{p.desc}</p>
                <ul className="space-y-4">
                  {p.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-base font-bold text-slate-900">
                      <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2 relative w-full">
                {/* Decorative background shape */}
                <div className={`absolute inset-0 bg-emerald-100 rounded-full blur-3xl opacity-40 transform ${i % 2 === 0 ? 'translate-x-10' : '-translate-x-10'}`}></div>
                <div className="relative bg-slate-50 p-2 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden aspect-video flex items-center justify-center group">
                  <img
                    src="/dashboard_verified.png"
                    alt={`KlaimFlow ${p.title} Interface`}
                    className="w-full h-full object-cover rounded-xl border border-slate-200/60 shadow-sm transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
