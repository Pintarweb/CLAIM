import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import ExportCSV from '../../components/ExportCSV';

const AdminReview = () => {
    const [batches, setBatches] = useState<any[]>([]);
    const [selectedBatch, setSelectedBatch] = useState<any | null>(null);
    const [claims, setClaims] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBatches = async () => {
        setLoading(true);
        // In a real app we would restrict this to users with 'admin' roles
        // For MVP, if you hit this route, we fetch all submitted batches across all users.
        const { data, error } = await supabase
            .from('claim_batches')
            .select(`
                *,
                user:user_id (email)
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching batches:", error);
        } else {
            setBatches(data || []);
        }
        setLoading(false);
    };

    const fetchClaimsForBatch = async (batchId: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('claims')
            .select('*')
            .eq('batch_id', batchId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error("Error fetching claims:", error);
        } else {
            setClaims(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBatches();
    }, []);

    const handleSelectBatch = (batch: any) => {
        setSelectedBatch(batch);
        fetchClaimsForBatch(batch.id);
    };

    const handleBack = () => {
        setSelectedBatch(null);
        setClaims([]);
    };

    if (selectedBatch) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div>
                        <button onClick={handleBack} className="text-sm font-bold text-slate-500 hover:text-slate-900 mb-2 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Back to Batches
                        </button>
                        <h2 className="text-2xl font-black text-slate-900">Reviewing Batch: {selectedBatch.month_year}</h2>
                        <p className="text-slate-500 font-medium">Submitted by: {selectedBatch.user?.email || selectedBatch.user_id}</p>
                    </div>

                    <ExportCSV batch={selectedBatch} claims={claims} />
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="text-slate-400 py-12 text-center">Loading claims...</div>
                    ) : claims.length === 0 ? (
                        <div className="text-slate-400 py-12 text-center bg-white rounded-3xl border border-slate-100">No claims found in this batch.</div>
                    ) : (
                        claims.map((claim, index) => (
                            <div key={claim.id} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full mb-2">Claim #{index + 1}</span>
                                        <h3 className="text-lg font-bold text-slate-900">{claim.start_location} → {claim.end_location}</h3>
                                        <p className="text-sm text-slate-500">{new Date(claim.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-500 uppercase">Distance Claimed</p>
                                        <p className="text-2xl font-black text-slate-900">{claim.manual_distance_km || claim.calculated_distance_km} <span className="text-lg">km</span></p>

                                        {Number(claim.manual_distance_km) !== claim.calculated_distance_km && (
                                            <div className="mt-1 px-3 py-1 bg-rose-50 border border-rose-100 rounded-lg text-left inline-block">
                                                <p className="text-xs font-bold text-rose-600 mb-1">Map Distance was {claim.calculated_distance_km}km</p>
                                                <p className="text-xs text-rose-800 italic">"{claim.justification_notes}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-sm font-bold text-slate-700 mb-2">Start Odometer</p>
                                        <a href={claim.start_odometer_img_url} target="_blank" rel="noreferrer" className="block aspect-video bg-slate-100 rounded-xl overflow-hidden hover:opacity-90 transition-opacity border border-slate-200">
                                            <img src={claim.start_odometer_img_url} alt="Start Odometer" className="object-cover w-full h-full" />
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-700 mb-2">End Odometer</p>
                                        <a href={claim.end_odometer_img_url} target="_blank" rel="noreferrer" className="block aspect-video bg-slate-100 rounded-xl overflow-hidden hover:opacity-90 transition-opacity border border-slate-200">
                                            <img src={claim.end_odometer_img_url} alt="End Odometer" className="object-cover w-full h-full" />
                                        </a>
                                    </div>
                                    {claim.toll_receipt_img_url ? (
                                        <div>
                                            <p className="text-sm font-bold text-slate-700 mb-2">Toll Receipt</p>
                                            <a href={claim.toll_receipt_img_url} target="_blank" rel="noreferrer" className="block aspect-video bg-slate-100 rounded-xl overflow-hidden hover:opacity-90 transition-opacity border border-slate-200">
                                                <img src={claim.toll_receipt_img_url} alt="Toll" className="object-cover w-full h-full" />
                                            </a>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-sm font-bold text-slate-700 mb-2">Toll Receipt</p>
                                            <div className="aspect-video bg-slate-50 border border-slate-200 border-dashed rounded-xl flex items-center justify-center text-slate-400 text-sm font-medium">
                                                No receipt
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">HR Review Portal</h2>
                <p className="text-slate-500 font-medium">Review and export compiled monthly batches for LHDN.</p>
            </div>

            {loading ? (
                <div className="text-slate-400 py-12 text-center">Loading batches...</div>
            ) : batches.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No batches pending review</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">Employees have not submitted any compiled drafts yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-4 text-xs font-bold uppercase text-slate-500">Month</th>
                                <th className="p-4 text-xs font-bold uppercase text-slate-500">Employee</th>
                                <th className="p-4 text-xs font-bold uppercase text-slate-500">Status</th>
                                <th className="p-4 text-xs font-bold text-right uppercase text-slate-500">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches.map(batch => (
                                <tr key={batch.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 font-bold text-slate-900">{batch.month_year}</td>
                                    <td className="p-4 text-slate-600 font-medium">{batch.user?.email || batch.user_id.split('-')[0]}</td>
                                    <td className="p-4">
                                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                                            {batch.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleSelectBatch(batch)}
                                            className="text-blue-600 font-bold hover:underline"
                                        >
                                            Review Batch &rarr;
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminReview;
