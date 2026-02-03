
import React from 'react';

const Compliance: React.FC = () => {
  const pillars = [
    {
      label: "INTENT",
      headerBg: "bg-blue-300",
      title: "Google Calendar Sync:",
      desc: "Every claim starts with a business purpose. Automatically linked to your team's scheduled tours and meetings.",
      icon: (
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <rect x="20" y="25" width="60" height="50" rx="8" stroke="#1e3a8a" strokeWidth="3" fill="white" />
            <path d="M20 38H80" stroke="#1e3a8a" strokeWidth="3" />
            <rect x="30" y="20" width="4" height="10" rx="2" fill="#d97706" />
            <rect x="66" y="20" width="4" height="10" rx="2" fill="#d97706" />
            <circle cx="75" cy="70" r="15" fill="#3b82f6" />
            <path d="M70 70 A5 5 0 1 1 80 70 M80 70 L83 67 M80 70 L83 73" stroke="white" strokeWidth="2" fill="none" />
            <path d="M80 70 A5 5 0 1 1 70 70 M70 70 L67 73 M70 70 L67 67" stroke="white" strokeWidth="2" fill="none" />
            <div className="absolute top-[45px] left-[35px] grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-sm bg-blue-400/40"></div>
              ))}
            </div>
          </svg>
        </div>
      )
    },
    {
      label: "PROOF",
      headerBg: "bg-blue-400",
      title: "Digital Receipt Snap:",
      desc: "Instant capture of physical receipts or TnG e-Wallet screenshots. AI-OCR extracts the merchant, date, and amount.",
      icon: (
        <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
          <div className="w-16 h-28 bg-blue-900 rounded-xl border-2 border-slate-800 relative overflow-hidden">
            <div className="absolute inset-2 bg-white rounded-lg p-1 flex flex-col items-center">
              <div className="w-full h-1 bg-slate-100 mb-1"></div>
              <div className="text-[10px] font-black text-slate-900 border border-slate-200 px-1 rounded">AI</div>
              <div className="w-full space-y-1 mt-2">
                <div className="h-0.5 bg-slate-100 w-full"></div>
                <div className="h-0.5 bg-slate-100 w-4/5"></div>
                <div className="h-0.5 bg-slate-100 w-full"></div>
              </div>
            </div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]"></div>
          </div>
          <div className="absolute inset-0">
             <svg className="w-full h-full" viewBox="0 0 100 100">
                <path d="M25,25 L35,25 M25,25 L25,35" stroke="#1e3a8a" strokeWidth="2" fill="none" />
                <path d="M65,25 L75,25 M75,25 L75,35" stroke="#1e3a8a" strokeWidth="2" fill="none" />
                <path d="M25,75 L35,75 M25,75 L25,65" stroke="#1e3a8a" strokeWidth="2" fill="none" />
                <path d="M65,75 L75,75 M75,75 L75,65" stroke="#1e3a8a" strokeWidth="2" fill="none" />
             </svg>
          </div>
        </div>
      )
    },
    {
      label: "VERIFICATION",
      headerBg: "bg-blue-900",
      title: "GPS-Tracked Route:",
      desc: "No more manual math. The app verifies the actual distance driven, accounting for Malaysian traffic detours.",
      icon: (
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path d="M80,20 C80,50 30,50 30,80" stroke="#3b82f6" strokeWidth="4" strokeDasharray="4 2" fill="none" />
            <circle cx="30" cy="80" r="12" fill="#1e3a8a" />
            <path d="M30,80 L35,70 A10,10 0 1 0 25,70 Z" fill="#f97316" />
            <circle cx="30" cy="73" r="2" fill="white" />
            <path d="M80,20 L80,35" stroke="#1e3a8a" strokeWidth="2" />
            <rect x="73" y="15" width="14" height="20" rx="2" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1" />
            <circle cx="80" cy="20" r="2" fill="#ef4444" />
            <circle cx="80" cy="25" r="2" fill="#facc15" />
            <circle cx="80" cy="30" r="2" fill="#22c55e" />
            <path d="M80,65 L80,75" stroke="#1e3a8a" strokeWidth="2" />
            <rect x="73" y="65" width="14" height="14" rx="2" fill="#f97316" stroke="#1e3a8a" strokeWidth="1" />
            <path d="M77,75 L80,68 L83,75" stroke="white" strokeWidth="1.5" fill="none" />
            <circle cx="30" cy="20" r="15" fill="#3b82f6" />
            <path d="M30,30 L35,20 A10,10 0 1 0 25,20 Z" fill="white" />
            <circle cx="30" cy="20" r="4" fill="#3b82f6" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-[#eff6ff] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-600 rounded text-[10px] font-black tracking-widest uppercase mb-6 text-white">LHDN Compliance Standard</div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">
            The <span className="relative">
              "Three-Way Match"
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-blue-600 opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span> Logic
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 font-bold">
            Audit-proofing your agency means matching <span className="text-slate-900 italic">Intent</span> with <span className="text-slate-900 italic">Proof</span> and <span className="text-slate-900 italic">Verification</span>. We automate all three.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {pillars.map((p, i) => (
            <div key={i} className="relative flex flex-col group">
              {/* Card Container */}
              <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full transform transition-all group-hover:scale-[1.02] duration-300">
                {/* Colored Header */}
                <div className={`${p.headerBg} py-2 text-center text-white text-xs font-black tracking-widest`}>
                  {p.label}
                </div>
                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  {p.icon}
                  <div className="text-center">
                    <h3 className="text-lg font-black text-blue-900 mb-4">{p.title}</h3>
                    <p className="text-slate-600 text-sm font-semibold leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector Arrows */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-6 -translate-y-1/2 z-20">
                   <svg className="w-12 h-12 text-blue-500 animate-pulse" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12 C10 4, 14 20, 20 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M17 15 L20 12 L17 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                   </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background element (star/sparkle) */}
      <div className="absolute bottom-8 right-8 text-blue-100 opacity-50">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
    </section>
  );
};

export default Compliance;
