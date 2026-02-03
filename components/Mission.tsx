
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
    { title: "The Build Vision", desc: "We are developing an AI-OCR engine specifically for Malaysian petrol and toll receipts. No more manual data entry or blurry photo disputes." },
    { title: "The Partnership", desc: "Show me your messiest claim, and I'll build the logic to automate it. We have spots for three more agencies to test our 2025 traffic math." },
    { title: "Lifetime Founding Discount", bold: true },
    { title: "Direct Influence on Feature Priority", bold: true },
    { title: "Complete Audit Preparation Kit", bold: true }
  ];

  return (
    <section id="mission-form" className="py-24 bg-[#1a367c] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2">
            <div className="inline-block px-3 py-1 bg-white/10 rounded text-[10px] font-bold tracking-widest uppercase mb-6">The Mission</div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              I'm looking for Partners, <br /> not just Customers.
            </h2>
            <p className="text-white mb-10 text-lg font-medium leading-relaxed">
              I'm an indie builder creating the tool I wish my family's agency had. We're moving away from the pain of "Reporting" once a month to a "Capture" workflow that makes the end-of-month panic disappear.
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
              <h3 className="text-2xl font-black mb-2">Claim Your Free Toolkit</h3>
              <p className="text-slate-600 text-sm font-semibold mb-8">Get instant access to the 2025 Audit-Ready Kit and join our pilot program waitlist.</p>
              
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
                  Claim My Toolkit & Join Pilot
                </button>
                
                <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  The toolkit download starts immediately. No payment required.
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
