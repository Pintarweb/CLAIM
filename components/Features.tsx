
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "The \"Big Plus\" Button",
      description: "Log a trip, snap a receipt, or capture a TnG eWallet screenshot in one tap. Perfect for busy drivers and guides.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      title: "Fair Route Logic",
      description: "Our engine accounts for inevitable peak-hour jams and necessary detour fairly, ensuring staff are never shortchanged.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      title: "Audit-Ready PDFs",
      description: "Auto-generate professional reports that meet LHDN 2024 digital standards for any state in Malaysia.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Zero-Storage Stress",
      description: "Ditch the shoeboxes. Our Supabase backend acts as your permanent digital archive. Search and retrieve receipts in seconds.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Built for the Field, Not the Desk</h2>
          <p className="text-slate-900 font-bold">Whether it's city transfers or outstation tours, we've got you covered.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-start group">
              <div className="mb-6 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">{f.title}</h3>
              <p className="text-slate-900 text-sm leading-relaxed font-bold">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
