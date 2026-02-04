
const BUCKET_NAME = 'claim-toolkit';
const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;

export const getPublicUrl = (filename: string) => {
    return `${PROJECT_URL}/storage/v1/object/public/${BUCKET_NAME}/${encodeURIComponent(filename)}`;
};

export const downloadFile = (filename: string) => {
    const url = getPublicUrl(filename);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.setAttribute('target', '_blank'); // Open in new tab primarily
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const DOCUMENTS = [
    {
        title: "The Audit-Ready Guide",
        baseName: "The Audit-Ready Guide"
    },
    {
        title: "Official Mileage & Expense Policy",
        baseName: "Official Mileage & Expense Policy"
    },
    {
        title: "Monthly Claim Checklist for Staff",
        baseName: "Monthly Claim Checklist for Staff"
    }
];
