import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const Mission: React.FC = () => {
  const [email, setEmail] = useState('');
  const [agency, setAgency] = useState('');
  const [agreedToPdpa, setAgreedToPdpa] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agency || !agreedToPdpa) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('leads')
        .insert([{
          email,
          agency_name: agency,
          pdpa_consent: true,
          consent_timestamp: new Date().toISOString()
        }]);

      if (insertError) throw insertError;

      // Invoke the edge function to handle emails and notifications
      const { error: functionError } = await supabase.functions.invoke('notify-lead', {
        body: { email, agency_name: agency }
      });

      if (functionError) {
        console.error('Error invoking notify-lead function:', functionError);
      }

      // Redirect to WhatsApp
      const message = `Hi I just requested the Free Audit Review for ${agency}.`;
      window.location.href = `https://wa.me/60174456243?text=${encodeURIComponent(message)}`;

    } catch (err: any) {
      console.error('Error submitting lead:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const bullets = [
    { title: "Identify phantom mileage and inflated claims", desc: "Find exactly where you're losing money to untracked detours and loose estimates." },
    { title: "Flag missing receipts and audit risks", desc: "See which claims would fail an LHDN audit today due to poor documentation." },
    { title: "Calculate your true ROI", desc: "Get a clear projection of how much time and money you'll save by switching to an automated system." },
    { title: "Custom KlaimFlow Implementation Plan", bold: true },
    { title: "Priority Onboarding for 2026 Compliance", bold: true }
  ];

  return (
    <section id="mission-form" className="py-24 bg-[#1a367c] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2">
            <div className="inline-block px-3 py-1 bg-white/10 rounded text-[10px] font-bold tracking-widest uppercase mb-6">Limited Availability</div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              Get Your Free <br /> Claim Audit Review.
            </h2>
            <p className="text-white mb-10 text-lg font-medium leading-relaxed">
              Stop guessing if you're overpaying or at risk. Let our experts run a quick analysis on your current claim process to uncover hidden leaks and compliance gaps.
              <br /><br />
              <span className="text-emerald-300 font-bold">100% free. No obligation. Just clear data on your claim risks.</span>
            </p>

            <div className="space-y-6">
              {bullets.slice(0, 3).map((b, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className={`text-sm ${b.bold ? 'font-bold' : 'font-semibold text-emerald-50'}`}>{b.title}</span>
                    {b.desc && <p className="text-xs text-emerald-100/70 mt-1 leading-relaxed">{b.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-[2rem] p-10 text-slate-900 shadow-2xl">
              <h3 className="text-2xl font-black mb-2">Claim Your Free Audit</h3>
              <p className="text-slate-600 text-sm font-semibold mb-8">Enter your details to schedule your review session.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nusantara Solutions"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="manager@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium transition-all"
                  />
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <div className="mt-1 flex items-center h-5">
                    <input
                      id="pdpa"
                      type="checkbox"
                      required
                      checked={agreedToPdpa}
                      onChange={(e) => setAgreedToPdpa(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                    />
                  </div>
                  <label htmlFor="pdpa" className="text-[10px] leading-[1.4] text-slate-500 font-semibold">
                    I agree to the processing of my personal data in accordance with the PDPA and to being contacted via WhatsApp for the purpose of this audit review and KlaimFlow onboarding.
                  </label>
                </div>

                {error && (
                  <div className="text-red-500 text-xs font-bold">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !agreedToPdpa}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black rounded-xl transition-all shadow-xl shadow-emerald-100 active:scale-[0.98] flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Schedule Free Audit Review"
                  )}
                </button>

                <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-4">
                  You’ll be redirected to WhatsApp for instant review
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Audit-Ready Kit Section pulled out of columns to balance height */}
        <div className="mt-20 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-black mb-2 text-center text-emerald-300">Your Free 2026 Audit-Ready Kit</h3>
          <p className="text-sm font-medium text-emerald-50/80 mb-10 text-center">Included with every audit review session:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-100 rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 hover:shadow-emerald-500/20 border-2 border-transparent hover:border-emerald-400 p-1">
              <img src="/thumbnails/audit_guide.png" alt="Audit Ready Guide" className="w-full h-auto rounded-lg" />
            </div>
            <div className="bg-slate-100 rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 hover:shadow-emerald-500/20 border-2 border-transparent hover:border-emerald-400 p-1">
              <img src="/thumbnails/policy.png" alt="Official Policy" className="w-full h-auto rounded-lg" />
            </div>
            <div className="bg-slate-100 rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 hover:shadow-emerald-500/20 border-2 border-transparent hover:border-emerald-400 p-1">
              <img src="/thumbnails/checklist.png" alt="Monthly Checklist" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
