
import React, { useState } from 'react';

interface MissionProps {
  onSubmit: () => void;
}

const Mission: React.FC<MissionProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [agency, setAgency] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agency) {
      onSubmit();
    }
  };

  const bullets = [
    { title: "2026 Audit-Ready Guide", desc: "Understand LHDN's latest requirements for travel and tour agencies, specifically regarding the 'Three-Way Match' rule." },
    { title: "The 'Fair-Traffic' Internal Policy Template", desc: "A ready-to-use PDF template to share with staff that explains how jam-detours and mileage variances are calculated fairly." },
    { title: "Digital Archive Checklist", desc: "A step-by-step list to help you move from physical shoeboxes to a digital, search-ready archive that lasts 7 years." },
    { title: "Exclusive Preview: ClaimFlow Automation", bold: true },
    { title: "Founding Partner Early-Access Invitation", bold: true }
  ];

  return (
    <section id="mission-form" className="py-24 bg-[#1a367c] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2">
            <div className="inline-block px-3 py-1 bg-white/10 rounded text-[10px] font-bold tracking-widest uppercase mb-6">Expert Resources</div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              Download the 2026 <br /> Audit-Ready Toolkit.
            </h2>
            <p className="text-white mb-10 text-lg font-medium leading-relaxed">
              Managing claims manually is a full-time job. Use our professional templates to set the foundation of trust with your staff and compliance with LHDN. 
              <br /><br />
              <span className="text-blue-300 font-bold">Then, see how ClaimFlow automates the entire process so you never have to touch a spreadsheet again.</span>
            </p>
            
            <div className="space-y-6">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className={`text-sm ${b.bold ? 'font-bold' : 'font-semibold text-blue-50'}`}>{b.title}</span>
                    {b.desc && <p className="text-xs text-blue-100/70 mt-1 leading-relaxed">{b.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-[2rem] p-10 text-slate-900 shadow-2xl">
              <h3 className="text-2xl font-black mb-2">Get Your Free Toolkit</h3>
              <p className="text-slate-600 text-sm font-semibold mb-8">Instant download for the Audit-Ready Guide & Policy Templates.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Agency Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nusantara Travel & Tours"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="manager@agency.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium transition-all"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-xl shadow-blue-100 active:scale-[0.98]"
                >
                  Download Toolkit & See Automation
                </button>
                
                <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  The toolkit download starts immediately.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
