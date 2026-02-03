
import React from 'react';

interface SuccessStateProps {
  onBack: () => void;
}

const SuccessState: React.FC<SuccessStateProps> = ({ onBack }) => {
  return (
    <div className="animate-in fade-in zoom-in duration-500 min-h-[70vh] flex items-center justify-center px-4 bg-white">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center shadow-inner">
            <svg className="w-12 h-12 text-blue-600 animate-bounce-short" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">You're on the list!</h1>
        <p className="text-xl text-slate-700 mb-12 font-semibold">
          Terima kasih! Check your email for the <span className="text-blue-600 font-bold">2025 Audit-Ready Kit</span>. We'll be in touch soon about your pilot spot.
        </p>

        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mb-8">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Quick Downloads</h3>
          <div className="grid gap-4">
            {['Fair-Traffic Policy.pdf', 'Staff Capture Guide.pdf', 'LHDN Checklist.pdf'].map((file) => (
              <div key={file} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold">PDF</div>
                  <span className="text-slate-900 font-bold text-sm">{file}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-bold text-sm">Download</button>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-slate-700 font-bold text-sm transition-colors"
        >
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessState;
