
import React, { useState } from 'react';
import { DOCUMENTS, downloadFile, getPublicUrl } from '../lib/storage';
import JSZip from 'jszip';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface SuccessStateProps {
  onBack: () => void;
}

const SuccessState: React.FC<SuccessStateProps> = ({ onBack }) => {
  const [isZipping, setIsZipping] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const location = useLocation();
  // Try state first, then fallback to local storage
  const userEmail = (location.state as any)?.email || localStorage.getItem('user_email');

  const downloadAllAsZip = async () => {
    setIsZipping(true);
    const zip = new JSZip();

    try {
      const promises = DOCUMENTS.flatMap(doc => {
        // Fetch both PDF and DOCX for each document
        const pdfUrl = getPublicUrl(`${doc.baseName}.pdf`);
        const docxUrl = getPublicUrl(`${doc.baseName}.docx`);

        return [
          fetch(pdfUrl).then(res => res.blob()).then(blob => zip.file(`${doc.baseName}.pdf`, blob)),
          fetch(docxUrl).then(res => res.blob()).then(blob => zip.file(`${doc.baseName}.docx`, blob))
        ];
      });

      await Promise.all(promises);

      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = "Audit-Ready-Toolkit-2026.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error zipping files:", error);
      alert("There was an error creating the zip file. Please download files individually.");
    } finally {
      setIsZipping(false);
    }
  };

  const applyForPilot = async () => {
    if (!userEmail) {
      console.error("No email found for application");
      alert("We couldn't find your email to process the application. Please go back and try downloading the toolkit again.");
      return;
    }

    setIsApplying(true);
    try {
      console.log("Attempting to update lead for:", userEmail);

      const { error } = await supabase.rpc('mark_as_interested', {
        user_email: userEmail
      });

      if (error) throw error;

      console.log("Successfully updated lead interest");
      setHasApplied(true);
    } catch (error) {
      console.error("Error applying for pilot:", error);
      alert("Could not submit application. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };
  return (
    <div className="animate-in fade-in zoom-in duration-500 min-h-[70vh] flex items-center justify-center px-4 bg-white py-20">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center shadow-inner">
            <svg className="w-12 h-12 text-emerald-600 animate-bounce-short" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Your Toolkit is Ready!</h1>
        <p className="text-xl text-slate-700 mb-12 font-semibold">
          <span className="text-emerald-600 font-bold">Download your 2026 Audit-Ready Kit below.</span> These guides will help you stay compliant manually.
        </p>

        <div className="flex flex-col gap-10 mb-12 relative z-10 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/30 text-left relative overflow-hidden group/container">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-50 to-indigo-50/20 rounded-full blur-3xl opacity-50 -z-10 group-hover/container:opacity-80 transition-opacity"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">1</span>
                Download Resources
              </h3>
              <button
                onClick={downloadAllAsZip}
                disabled={isZipping}
                className="text-[10px] font-black text-white bg-slate-900 hover:bg-emerald-600 px-3 py-2 rounded-lg transition-all shadow-md active:scale-95 uppercase tracking-widest disabled:opacity-50 flex items-center space-x-1.5"
              >
                {isZipping ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Bundling...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>Get All (ZIP)</span>
                  </>
                )}
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6 relative z-10">
              {DOCUMENTS.map((doc) => (
                <div key={doc.baseName} className="group relative flex flex-col p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden text-center h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                  <div className="flex flex-col items-center w-full z-10 mb-5">
                    <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:scale-[1.03] group-hover:shadow transition-all duration-500 mb-4 relative">
                      <img
                        src={doc.thumbnail || "/placeholder.jpg"}
                        alt={`${doc.title} thumbnail`}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <span className="text-slate-900 font-extrabold text-sm leading-snug block group-hover:text-emerald-700 transition-colors mb-1">{doc.title}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 py-1.5 px-3 rounded-md mx-auto mt-2 shadow-sm inline-block">SOP Document</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 w-full mt-auto z-10 relative">
                    <button
                      onClick={() => downloadFile(`${doc.baseName}.pdf`)}
                      className="flex-1 py-2.5 bg-white border border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 rounded-lg text-[11px] font-black transition-all shadow-sm hover:shadow active:scale-95 flex items-center justify-center space-x-1.5"
                      title="Download PDF"
                      aria-label={`Download ${doc.title} PDF`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                      <span>PDF</span>
                    </button>
                    <button
                      onClick={() => downloadFile(`${doc.baseName}.docx`)}
                      className="flex-1 py-2.5 bg-white border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 text-emerald-600 rounded-lg text-[11px] font-black transition-all shadow-sm hover:shadow active:scale-95 flex items-center justify-center space-x-1.5"
                      title="Download Word Doc"
                      aria-label={`Download ${doc.title} Word Document`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                      <span>DOCX</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-600 rounded-3xl p-8 md:p-12 text-white text-left relative overflow-hidden shadow-2xl shadow-emerald-600/20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/40 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>

            <div className="grid md:grid-cols-5 gap-10 items-center relative z-10">
              <div className="md:col-span-2">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-emerald-200 mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/50 flex items-center justify-center text-white">2</span>
                  The Logical Next Step
                </h3>
                <h4 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">Join the<br />Pilot Program</h4>

                <p className="text-emerald-100 font-semibold text-lg leading-relaxed mb-6">
                  Ready to stop doing this manually? We are looking for 10 Corporate Partners to build the future of claim automation with us.
                </p>
              </div>

              <div className="md:col-span-3 bg-emerald-700/30 p-8 rounded-2xl border border-emerald-500/30 shadow-xl backdrop-blur-sm">
                {hasApplied ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-6 text-center py-6">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-2xl font-black text-white mb-2">Thank you for your interest!</h5>
                      <p className="text-emerald-100 text-base leading-relaxed max-w-sm mx-auto">
                        We've received your pilot program application. Our team will contact you soon with the next steps.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-6 mb-8">
                      <div className="flex items-start">
                        <div className="bg-emerald-500 w-10 h-10 rounded-xl flex items-center justify-center mr-4 shrink-0 shadow-inner">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div>
                          <span className="font-bold block text-white text-[17px]">Automate the "Three-Way Match"</span>
                          <span className="text-sm text-emerald-100/90 leading-relaxed block mt-1.5">Our AI validates Proof, Intent, and Eligibility instantly, saving you hours every month.</span>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-emerald-500 w-10 h-10 rounded-xl flex items-center justify-center mr-4 shrink-0 shadow-inner">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div>
                          <span className="font-bold block text-white text-[17px]">Founding Partner Status</span>
                          <span className="text-sm text-emerald-100/90 leading-relaxed block mt-1.5">Get lifetime access at our lowest early-bird pricing and direct access to our engineering team.</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-emerald-500/30">
                      <button
                        onClick={applyForPilot}
                        disabled={isApplying}
                        className="w-full mt-6 py-4.5 font-black text-[17px] rounded-xl transition-all shadow-lg active:scale-[0.98] flex justify-center items-center bg-white text-emerald-600 hover:bg-emerald-50 hover:-translate-y-0.5"
                      >
                        {isApplying ? (
                          <svg className="animate-spin h-6 w-6 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          "Apply for Pilot Program"
                        )}
                      </button>
                      <p className="text-center text-emerald-200 text-[10px] uppercase font-black tracking-widest mt-4">Limited spots available for 2026</p>
                    </div>
                  </>
                )}
              </div>
            </div>
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
