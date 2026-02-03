
import React from 'react';

const Workflow: React.FC = () => {
  return (
    <section className="bg-blue-50/30 py-20 border-y border-blue-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-[#1e40af] text-white py-4 px-8 rounded-t-2xl text-center mb-12 shadow-lg">
          <h2 className="text-xl md:text-3xl font-black tracking-tight uppercase">
            CLAIM<span className="text-blue-200">FLOW</span>: FROM RECEIPT TO REIMBURSEMENT IN SECONDS
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch relative">
          {/* Step 1 */}
          <div className="flex flex-col h-full group">
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 flex-grow shadow-sm group-hover:shadow-md transition-shadow flex flex-col items-center">
              <div className="text-center mb-6">
                <span className="block text-sm font-black text-slate-900 uppercase">STEP 1: ONE-TAP CAPTURE</span>
                <span className="block text-xs font-bold text-slate-400 uppercase">(The Proof)</span>
              </div>
              
              <div className="relative w-48 h-64 bg-slate-900 rounded-[2.5rem] border-8 border-slate-800 shadow-2xl overflow-hidden mb-6">
                <div className="absolute top-0 w-full h-6 bg-slate-800 flex justify-center pt-1">
                  <div className="w-12 h-3 bg-black rounded-full"></div>
                </div>
                <div className="p-4 pt-10 h-full bg-slate-100">
                  <div className="bg-white p-2 rounded shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-[6px] font-bold text-white">TnG</div>
                      <div className="text-[6px] font-bold text-slate-400">TOUCH 'N GO</div>
                    </div>
                    <div className="space-y-1 mb-2">
                      <div className="h-1 bg-slate-100 w-full"></div>
                      <div className="h-1 bg-slate-100 w-3/4"></div>
                    </div>
                    <div className="text-center py-1 border-y border-dashed border-slate-200">
                      <div className="text-[8px] font-black text-slate-900">Toll Plaza LDP - RM 2.10</div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white animate-pulse">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                   </div>
                </div>
              </div>

              <p className="text-center text-sm font-bold text-slate-900">
                Just snap a photo of the physical or digital receipt.
              </p>
            </div>
            {/* Arrow */}
            <div className="hidden md:flex absolute top-1/2 left-[31%] -translate-y-1/2 z-10">
              <svg className="w-10 h-10 text-blue-400 animate-bounce-horizontal" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.025 1l-2.847 2.828 6.176 6.172h-16.354v4h16.354l-6.176 6.172 2.847 2.828 10.975-11z" />
              </svg>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col h-full group">
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 flex-grow shadow-sm group-hover:shadow-md transition-shadow flex flex-col items-center">
              <div className="text-center mb-6">
                <span className="block text-sm font-black text-slate-900 uppercase">STEP 2: AI-EXTRACTED DATA</span>
                <span className="block text-xs font-bold text-slate-400 uppercase">(The Logic)</span>
              </div>
              
              <div className="relative w-56 h-64 bg-slate-900 rounded-lg border-4 border-slate-800 shadow-2xl overflow-hidden mb-6">
                <div className="p-3 h-full bg-white flex flex-col">
                   <div className="text-[8px] font-black text-slate-400 mb-2">ClaimFlow App</div>
                   <div className="space-y-3">
                     <div>
                       <div className="text-[6px] font-bold text-slate-400 mb-0.5 uppercase">Vendor</div>
                       <div className="h-4 bg-slate-50 border border-slate-100 rounded px-1 flex items-center">
                         <span className="text-[7px] font-bold text-slate-900">Toll Plaza LDP</span>
                       </div>
                     </div>
                     <div className="flex gap-2">
                        <div className="flex-1">
                          <div className="text-[6px] font-bold text-slate-400 mb-0.5 uppercase">Date</div>
                          <div className="h-4 bg-slate-50 border border-slate-100 rounded px-1 flex items-center text-[7px] font-bold">25 Oct 2026</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[6px] font-bold text-slate-400 mb-0.5 uppercase">Time</div>
                          <div className="h-4 bg-slate-50 border border-slate-100 rounded px-1 flex items-center text-[7px] font-bold">10:45 AM</div>
                        </div>
                     </div>
                     <div className="relative">
                       <div className="text-[6px] font-bold text-slate-400 mb-0.5 uppercase">Amount</div>
                       <div className="h-5 bg-blue-50 border border-blue-200 rounded px-1 flex items-center text-[8px] font-black text-blue-600">RM 2.10</div>
                       <div className="absolute right-0 top-0 translate-y-2 translate-x-2 bg-blue-600 text-white px-1.5 py-0.5 rounded-full text-[6px] font-black flex items-center space-x-1 shadow-md">
                         <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                         <span>AI VERIFIED</span>
                       </div>
                     </div>
                   </div>
                </div>
              </div>

              <p className="text-center text-sm font-bold text-slate-900">
                AI instantly reads and populates all key details.
              </p>
            </div>
            {/* Arrow */}
            <div className="hidden md:flex absolute top-1/2 left-[64%] -translate-y-1/2 z-10">
              <svg className="w-10 h-10 text-blue-400 animate-bounce-horizontal" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.025 1l-2.847 2.828 6.176 6.172h-16.354v4h16.354l-6.176 6.172 2.847 2.828 10.975-11z" />
              </svg>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col h-full group">
            <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 flex-grow shadow-sm group-hover:shadow-md transition-shadow flex flex-col items-center">
              <div className="text-center mb-6">
                <span className="block text-sm font-black text-slate-900 uppercase">STEP 3: GPS-LINKED MAP</span>
                <span className="block text-xs font-bold text-slate-400 uppercase">(The Context)</span>
              </div>
              
              <div className="relative w-48 h-64 bg-slate-900 rounded-[2.5rem] border-8 border-slate-800 shadow-2xl overflow-hidden mb-6">
                <div className="absolute top-0 w-full h-6 bg-slate-800 flex justify-center pt-1">
                  <div className="w-12 h-3 bg-black rounded-full"></div>
                </div>
                <div className="p-0 h-full bg-blue-50 relative">
                  {/* Mock Map */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
                       <path d="M0,20 Q50,40 100,20" stroke="white" strokeWidth="2" fill="none" />
                       <path d="M20,0 Q40,50 20,100" stroke="white" strokeWidth="2" fill="none" />
                       <path d="M80,0 Q60,50 80,100" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <svg className="w-32 h-32 text-blue-500" viewBox="0 0 100 100" fill="none">
                         <path d="M10,80 C30,60 70,40 90,20" stroke="currentColor" strokeWidth="3" strokeDasharray="5,5" />
                         <circle cx="10" cy="80" r="4" fill="#ef4444" />
                         <circle cx="90" cy="20" r="4" fill="#3b82f6" />
                      </svg>
                      <div className="absolute top-0 right-0 bg-blue-600 text-white text-[6px] font-black px-1 py-0.5 rounded shadow">
                        LDP HIGHWAY
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm font-bold text-slate-900">
                Automatically links expense to the exact trip and route taken.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-blue-800/60 bg-blue-100/50 inline-block px-4 py-2 rounded-full border border-blue-200">
            The 'Vibe' Way to Process Claims: Snap, Verify, Done. | ClaimFlow | Ark Alliance
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Workflow;
