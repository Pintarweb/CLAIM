
import React, { useState } from 'react';

const TrustSnippet: React.FC = () => {
  const [isOn, setIsOn] = useState(true);

  return (
    <section className="py-24 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Visual Snippet */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-blue-100/50 rounded-[2.5rem] blur-2xl group-hover:bg-blue-200/50 transition-colors"></div>

              {/* Mobile Card Mockup */}
              <div className="relative w-full max-w-sm bg-white border border-slate-200 rounded-[2rem] shadow-2xl p-6 select-none transition-transform hover:scale-[1.02]">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Trip Settings</h4>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <p className="text-sm font-black text-slate-900">Traffic / Jam Detour</p>
                      <p className="text-[10px] font-bold text-slate-500">Adds variance to base mileage</p>
                    </div>
                    <button
                      onClick={() => setIsOn(!isOn)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${isOn ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isOn ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  {isOn && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 mb-4">
                        <div className="flex justify-between text-[10px] font-black uppercase text-blue-600 mb-2">
                          <span>Verified Status</span>
                          <span>Timestamped</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.604.3 1.166.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-bold text-slate-900">Heavy Traffic Adjustment (+12%)</span>
                        </div>
                      </div>
                      <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm italic text-[10px] text-slate-500">
                        "Federal Highway flash flood detour"
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Audit Trail</span>
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
              The Toggle that Builds <br /> <span className="text-blue-600">Mutual Trust.</span>
            </h2>

            <div className="space-y-8">
              <div className="group">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black">1</div>
                  <h3 className="text-xl font-bold text-slate-900">For Your Staff: "We trust you."</h3>
                </div>
                <p className="text-slate-900 font-bold pl-11">
                  Jams are part of life in Malaysia. We don't punish your drivers for detours. They simply toggle traffic mode, and the math adjusts fairly.
                </p>
              </div>

              <div className="group">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black">2</div>
                  <h3 className="text-xl font-bold text-slate-900">For Owners: "It's audited."</h3>
                </div>
                <p className="text-slate-900 font-bold pl-11">
                  Every detour is timestamped and cross-referenced with real-time traffic data. You get a clean audit trail that justifies every Ringgit spent.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSnippet;
