import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const MyDrafts = () => {
    const navigate = useNavigate();
    const [drafts, setDrafts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchDrafts = async () => {
        setLoading(true);
        const user = (await supabase.auth.getUser()).data.user;
        if (!user) return;

        const { data, error } = await supabase
            .from('claims')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'draft')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching drafts:", error);
        } else {
            setDrafts(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDrafts();
    }, []);

    const handleSubmitToHR = async () => {
        if (drafts.length === 0) return;

        const confirmSubmit = window.confirm(`Are you sure you want to compile and submit these ${drafts.length} claims to HR? This action cannot be reversed.`);
        if (!confirmSubmit) return;

        setSubmitting(true);
        try {
            const user = (await supabase.auth.getUser()).data.user;
            if (!user) throw new Error("Not authenticated");

            // 1. Create a new Batch
            const currentMonth = new Date().toISOString().slice(0, 7); // yyyy-mm
            const { data: batchData, error: batchError } = await supabase
                .from('claim_batches')
                .insert({
                    user_id: user.id,
                    month_year: currentMonth,
                    status: 'submitted'
                })
                .select()
                .single();

            if (batchError) throw batchError;

            // 2. Update all draft claims to belong to this batch and set status to submitted
            const draftIds = drafts.map(d => d.id);
            const { error: updateError } = await supabase
                .from('claims')
                .update({
                    status: 'submitted',
                    batch_id: batchData.id
                })
                .in('id', draftIds);

            if (updateError) throw updateError;

            // 3. Clear local state
            setDrafts([]);
            alert("Successfully compiled and submitted to HR!");
            navigate('/dashboard');

        } catch (error: any) {
            console.error(error);
            alert(`Error submitting batch: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Delete this draft permanently?");
        if (!confirmDelete) return;

        const { error } = await supabase.from('claims').delete().eq('id', id);
        if (error) {
            alert("Failed to delete draft.");
        } else {
            setDrafts(drafts.filter(d => d.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">My Drafts</h2>
                    <p className="text-slate-500 font-medium">Pending claims to be compiled for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                </div>

                <button
                    onClick={handleSubmitToHR}
                    disabled={drafts.length === 0 || submitting}
                    className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-900/20 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                >
                    {submitting ? 'Compiling...' : `Compile & Submit to HR (${drafts.length})`}
                </button>
            </div>

            {loading ? (
                <div className="text-slate-400 py-12 text-center">Loading drafts...</div>
            ) : drafts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No drafts found for this month</h3>
                    <p className="text-slate-500 mb-6 max-w-sm mx-auto">Start logging your trips by submitting a new claim. They will be saved here until you compile them for HR.</p>
                    <button
                        onClick={() => navigate('/dashboard/new-claim')}
                        className="text-emerald-600 font-bold hover:underline"
                    >
                        + Submit New Claim
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drafts.map((claim) => (
                        <div key={claim.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors group relative">
                            <button
                                onClick={() => handleDelete(claim.id)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                title="Delete Draft"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-500">Route</p>
                                    <p className="text-sm font-semibold text-slate-900 truncate max-w-[200px]">{claim.start_location} → {claim.end_location}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-end border-t border-slate-100 pt-4 mt-4">
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Claimed Distance</p>
                                    <p className="font-black text-slate-900">{claim.manual_distance_km || claim.calculated_distance_km} km</p>
                                </div>
                                {Number(claim.manual_distance_km) !== claim.calculated_distance_km && (
                                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-md">
                                        Map Discrepancy
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyDrafts;
