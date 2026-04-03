import React from 'react';

interface ExportCSVProps {
    batch: any;
    claims: any[];
}

const ExportCSV: React.FC<ExportCSVProps> = ({ batch, claims }) => {

    const handleExport = () => {
        if (!claims || claims.length === 0) {
            alert("No claims to export.");
            return;
        }

        // Define LHDN required columns
        const headers = [
            "Date Submitted",
            "Employee Email",
            "Month/Year",
            "Start Location",
            "End Location",
            "Map Distance (km)",
            "Claimed Distance (km)",
            "Discrepancy (km)",
            "Justification",
            "Start Odometer URL",
            "End Odometer URL",
            "Toll Receipt URL"
        ];

        // Format rows
        const rows = claims.map(claim => {
            const mapDist = claim.calculated_distance_km;
            const claimDist = claim.manual_distance_km || mapDist;
            const discrepancy = Math.abs(claimDist - mapDist);

            return [
                new Date(claim.created_at).toLocaleDateString(),
                batch.user?.email || batch.user_id,
                batch.month_year,
                `"${claim.start_location.replace(/"/g, '""')}"`, // Escape quotes
                `"${claim.end_location.replace(/"/g, '""')}"`,
                mapDist,
                claimDist,
                discrepancy.toFixed(2),
                `"${(claim.justification_notes || '').replace(/"/g, '""')}"`,
                claim.start_odometer_img_url,
                claim.end_odometer_img_url,
                claim.toll_receipt_img_url || ''
            ].join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');

        // Trigger browser download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `KlaimFlow_Report_${batch.month_year}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleExport}
            disabled={claims.length === 0}
            className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 flex items-center gap-2"
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export to CSV
        </button>
    );
};

export default ExportCSV;
