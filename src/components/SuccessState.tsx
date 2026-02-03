
import React from 'react';

interface SuccessStateProps {
  onBack: () => void;
}

const SuccessState: React.FC<SuccessStateProps> = ({ onBack }) => {
  return (
    <div className="animate-in fade-in zoom-in duration-500 min-h-[70vh] flex items-center justify-center px-4 bg-white py-20">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center shadow-inner">
            <svg className="w-12 h-12 text-blue-600 animate-bounce-short" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Your Toolkit is Ready!</h1>
        <p className="text-xl text-slate-700 mb-12 font-semibold">
          Check your email for the <span className="text-blue-600 font-bold">2026 Audit-Ready Kit</span>. These guides will help you stay compliant manually.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
           <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-left">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">1. Download Resources</h3>
            <div className="grid gap-4">
              {['Fair-Traffic Policy.pdf', 'Staff Capture Guide.pdf', 'LHDN Checklist.pdf'].map((file) => (
                <div key={file} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[8px] font-bold">PDF</div>
                    <span className="text-slate-900 font-bold text-xs truncate max-w-[120px]">{file}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-bold text-xs">Download</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-3xl p-8 text-white text-left relative overflow-hidden shadow-xl shadow-blue-200">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-100 mb-4">2. The Logical Next Step</h3>
            <h4 className="text-2xl font-black mb-4">Put it on Autopilot</h4>
            <p className="text-blue-50 text-sm font-medium mb-8 leading-relaxed">
              Don't want to manage the "Three-Way Match" with spreadsheets? Join our Pilot Program and let ClaimFlow's AI-OCR handle the proof, intent, and verification for you.
            </p>
            <button className="w-full py-3 bg-white text-blue-600 font-black rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Apply for Pilot Program
            </button>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors"
        >
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessState;
