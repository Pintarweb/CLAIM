
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
          <div className="w-24 h-24 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center shadow-inner">
            <svg className="w-12 h-12 text-blue-600 animate-bounce-short" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Your Toolkit is Ready!</h1>
        <p className="text-xl text-slate-700 mb-12 font-semibold">
          <span className="text-blue-600 font-bold">Download your 2026 Audit-Ready Kit below.</span> These guides will help you stay compliant manually.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-left">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">1. Download Resources</h3>
              <button
                onClick={downloadAllAsZip}
                disabled={isZipping}
                className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest disabled:opacity-50 flex items-center space-x-1"
              >
                {isZipping ? (
                  <>
                    <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Bundling...</span>
                  </>
                ) : (
                  <span>Download All (ZIP)</span>
                )}
              </button>
            </div>
            <div className="grid gap-4">
              {DOCUMENTS.map((doc) => (
                <div key={doc.baseName} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm gap-4">
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-slate-900 font-bold text-sm leading-tight">{doc.title}</span>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => downloadFile(`${doc.baseName}.pdf`)}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[10px] font-bold transition-colors flex items-center space-x-1"
                      title="Download PDF"
                    >
                      <span>PDF</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                    <button
                      onClick={() => downloadFile(`${doc.baseName}.docx`)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-bold transition-colors flex items-center space-x-1"
                      title="Download Word Doc"
                    >
                      <span>DOCX</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-3xl p-8 text-white text-left relative overflow-hidden shadow-xl shadow-blue-200 flex flex-col justify-between">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-200 mb-4">2. The Logical Next Step</h3>
              <h4 className="text-3xl font-black mb-6">Join the Pilot Program</h4>

              <p className="text-blue-100 font-semibold mb-8 text-sm leading-relaxed">
                Ready to stop doing this manually? We are looking for 10 Travel Agencies to build the future of claim automation with us.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-500/50 p-1.5 rounded-lg mr-3 mt-0.5 shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <span className="font-bold block text-white text-sm">Automate the "Three-Way Match"</span>
                    <span className="text-xs text-blue-100/80 leading-relaxed block mt-1">Our AI validates Proof, Intent, and Eligibility instantly, saving you hours every month.</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500/50 p-1.5 rounded-lg mr-3 mt-0.5 shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <span className="font-bold block text-white text-sm">Founding Partner Status</span>
                    <span className="text-xs text-blue-100/80 leading-relaxed block mt-1">Get lifetime access at our lowest early-bird pricing and direct access to our engineering team.</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={applyForPilot}
                disabled={isApplying || hasApplied}
                className={`w-full py-4 font-black rounded-xl transition-all shadow-lg active:scale-[0.98] flex justify-center items-center ${hasApplied
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
              >
                {isApplying ? (
                  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : hasApplied ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    Application Received!
                  </>
                ) : (
                  "Apply for Pilot Program"
                )}
              </button>
              <p className="text-center text-blue-200 text-[10px] uppercase font-bold tracking-widest mt-4">Limited spots available for 2026</p>
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
