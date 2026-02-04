
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero-top" className="pt-24 md:pt-32 pb-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-blue-600 text-[10px] font-extrabold tracking-widest uppercase">Built for Malaysian Tourism Agencies</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
          End the <span className="text-blue-600">End-of-Month <br /> Claim Scramble.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-slate-900 mb-10 leading-relaxed font-bold">
          One-tap capture for staff. Audit-ready reports for owners. We handle the heavy traffic math and outstation detours while you focus on the tours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <button
            onClick={() => document.getElementById('mission-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-200 flex items-center group"
          >
            Download 2026 Audit-Ready Toolkit
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>LHDN e-Invoicing Ready</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="whitespace-nowrap">Zero-Storage Stress</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-slate-100">
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-1">90%</div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-widest">Submission Stress Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-1">RM 0.00</div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-widest">Disputes Over "Heavy Traffic"</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-1">1 Tap</div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-widest">To Generate Appendix A, B, & C</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
