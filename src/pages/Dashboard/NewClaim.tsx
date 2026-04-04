import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const NewClaim = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [startImg, setStartImg] = useState<File | null>(null);
    const [endImg, setEndImg] = useState<File | null>(null);
    const [receiptImg, setReceiptImg] = useState<File | null>(null);

    // Anomaly State
    const [mapDistance, setMapDistance] = useState<number>(0);
    const [claimedDistance, setClaimedDistance] = useState<number | ''>('');
    const [justification, setJustification] = useState('');

    const handleFileUpload = async (file: File, prefix: string) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${prefix}-${Math.random()}.${fileExt}`;
        const filePath = `${(await supabase.auth.getUser()).data.user?.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('claim-receipts')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('claim-receipts').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const calculateDistance = async () => {
        setLoading(true);
        try {
            // 1. Geocode Start Location (OpenStreetMap Nominatim)
            const startRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startLocation)}`);
            const startData = await startRes.json();
            if (!startData || startData.length === 0) throw new Error("Could not find start location");
            const startCoords = `${startData[0].lon},${startData[0].lat}`;

            // 2. Geocode End Location (OpenStreetMap Nominatim)
            const endRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endLocation)}`);
            const endData = await endRes.json();
            if (!endData || endData.length === 0) throw new Error("Could not find end location");
            const endCoords = `${endData[0].lon},${endData[0].lat}`;

            // 3. Calculate Route (OSRM)
            const osrmRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${startCoords};${endCoords}?overview=false`);
            const osrmData = await osrmRes.json();
            if (osrmData.code !== 'Ok' || !osrmData.routes || osrmData.routes.length === 0) {
                throw new Error("Could not calculate driving route");
            }

            // OSRM returns distance in meters. Convert to km.
            const distanceKm = Number((osrmData.routes[0].distance / 1000).toFixed(2));

            setMapDistance(distanceKm);
            setClaimedDistance(distanceKm);
            setStep(3);
        } catch (error: any) {
            console.error("OSRM Routing Error:", error);
            alert(`Failed to calculate route: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDraft = async () => {
        if (!startLocation || !endLocation || !startImg || !endImg) {
            alert("Please fill in all mandatory location and odometer fields.");
            return;
        }

        if (Number(claimedDistance) !== mapDistance && !justification) {
            alert("Please provide a justification for the mismatched distance.");
            return;
        }

        setLoading(true);
        try {
            const user = (await supabase.auth.getUser()).data.user;
            if (!user) throw new Error("Not authenticated");

            // 1. Upload Images
            const startUrl = await handleFileUpload(startImg, 'start');
            const endUrl = await handleFileUpload(endImg, 'end');
            let receiptUrl = null;
            if (receiptImg) {
                receiptUrl = await handleFileUpload(receiptImg, 'receipt');
            }

            // 2. Save Claim
            const { error } = await supabase.from('claims').insert({
                user_id: user.id,
                start_location: startLocation,
                end_location: endLocation,
                start_odometer_img_url: startUrl,
                end_odometer_img_url: endUrl,
                toll_receipt_img_url: receiptUrl,
                calculated_distance_km: mapDistance,
                manual_distance_km: Number(claimedDistance),
                justification_notes: justification || null,
                status: 'draft'
            });

            if (error) throw error;

            navigate('/dashboard/drafts');
        } catch (error: any) {
            console.error(error);
            alert(`Error saving draft: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-6">New Expense Claim</h2>

            {/* Step Indicators */}
            <div className="flex space-x-2 mb-8">
                {[1, 2, 3].map((s) => (
                    <div key={s} className={`h-2 flex-1 rounded-full ${step >= s ? 'bg-emerald-600' : 'bg-slate-100'}`} />
                ))}
            </div>

            {/* Step 1: Start Point */}
            {step === 1 && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Start Location</label>
                        <input
                            type="text"
                            value={startLocation}
                            onChange={(e) => setStartLocation(e.target.value)}
                            placeholder="e.g. KLIA Terminal 1"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-600 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Start Odometer Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setStartImg(e.target.files?.[0] || null)}
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                        />
                    </div>
                    <button
                        onClick={() => setStep(2)}
                        disabled={!startLocation || !startImg}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 mt-4"
                    >
                        Next: End Trip
                    </button>
                </div>
            )}

            {/* Step 2: End Point */}
            {step === 2 && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">End Location</label>
                        <input
                            type="text"
                            value={endLocation}
                            onChange={(e) => setEndLocation(e.target.value)}
                            placeholder="e.g. Petronas Twin Towers"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-600 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">End Odometer Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setEndImg(e.target.files?.[0] || null)}
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Toll Receipt Photo (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setReceiptImg(e.target.files?.[0] || null)}
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
                        />
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={() => setStep(1)}
                            className="w-1/3 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200"
                        >
                            Back
                        </button>
                        <button
                            onClick={calculateDistance}
                            disabled={!endLocation || !endImg || loading}
                            className="w-2/3 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50"
                        >
                            {loading ? "Calculating Route..." : "Review Claim"}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Review & Anomaly */}
            {step === 3 && (
                <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-sm text-slate-500 font-bold mb-1">Calculated Map Distance</p>
                                <p className="text-3xl font-black text-slate-900">{mapDistance} km</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Actual Claimed Distance (km)</label>
                                <input
                                    type="number"
                                    value={claimedDistance}
                                    onChange={(e) => setClaimedDistance(e.target.value ? Number(e.target.value) : '')}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-emerald-600 outline-none font-bold text-lg"
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    If this differs from the map distance above (due to detours, traffic, etc.), you must provide a justification below for LHDN compliance.
                                </p>
                            </div>

                            {Number(claimedDistance) !== mapDistance && (
                                <div className="animate-in fade-in slide-in-from-top-4">
                                    <label className="block text-sm font-bold text-rose-600 mb-2">Detour Justification Required*</label>
                                    <textarea
                                        value={justification}
                                        onChange={(e) => setJustification(e.target.value)}
                                        placeholder="E.g., Road closure on main highway required a 5km detour through..."
                                        className="w-full px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 focus:ring-2 focus:ring-rose-600 outline-none min-h-[100px]"
                                        required
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-8">
                        <button
                            onClick={() => setStep(2)}
                            disabled={loading}
                            className="w-1/3 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 disabled:opacity-50"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleSaveDraft}
                            disabled={loading || (Number(claimedDistance) !== mapDistance && !justification)}
                            className="w-2/3 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-900/20 transition-all disabled:opacity-50"
                        >
                            {loading ? "Saving Draft..." : "Save to Drafts"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewClaim;
