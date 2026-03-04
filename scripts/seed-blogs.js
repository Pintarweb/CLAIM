import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const articles = [
    {
        title: "How OpenStreetMap is Revolutionizing Mileage Claims",
        slug: "openstreetmap-mileage-claims",
        description: "Discover how integrating OpenStreetMap completely eliminates distance disputes and fraudulent mileage claims by standardizing point-to-point calculations.",
        author: "Anthony",
        avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop",
        image_url: "/blog/mileage-automation.png",
        created_at: "2026-03-01T08:00:00Z",
        content: `## The Mileage Claim Problem

For decades, employees have relied on manual odometer readings to submit their travel claims. This process is inherently flawed, often leading to overestimations and disputes.

With ClaimFlow, we've integrated **OpenStreetMap** directly into the submission workflow.

### Why OpenStreetMap?

By standardizing the distance calculation engine, HR departments no longer need to double-check routes on Google Maps. The system automatically computes the **best compliant route** rather than just the shortest physical path, mimicking real-world driving conditions while maintaining strict policy constraints. 

It calculates the exact payout based on the company's per-KM rate, fundamentally eliminating guesswork. This represents a massive paradigm shift in operational efficiency for B2B enterprises in Malaysia.`
    },
    {
        title: "The Power of Drafts: Why Batch Submission Saves HR 20 Hours a Month",
        slug: "batch-submission-workflow",
        description: "Instead of bombarding HR with daily receipts, learn why allowing employees to save claims as drafts and submit them in monthly batches is the ultimate productivity hack.",
        author: "Kim",
        avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop",
        image_url: "/blog/draft-workflow.png",
        created_at: "2026-02-18T09:30:00Z",
        content: `## The Daily Receipt Nightmare

Most legacy claim systems operate on a transactional scale: incurred an expense, submit a form. This clogs up managerial queues and frustrates accounting.

### Enter the Batch Workflow

ClaimFlow solves this by treating the month as a single sprint. Employees take photos of their receipts and save them as **Drafts** on their phone.

At the end of the month, they click a single button: **Submit Batch**.

Suddenly, managers only have to approve travel expenses once a month per employee. This asynchronous workflow is guaranteed to save your administrative staff at least 20 hours a month.`
    },
    {
        title: "Passwordless Authentication: Magic Links for Faster Onboarding",
        slug: "magic-link-authentication",
        description: "Say goodbye to 'forgot password' tickets. See how Magic Link authentication secures your enterprise data while providing a frictionless login experience.",
        author: "Jochem",
        avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&auto=format&fit=crop",
        image_url: "/blog/magic-link.png",
        created_at: "2026-02-04T14:15:00Z",
        content: `## Security Meets Convenience

Let's face facts: your employees hate remembering another password for an internal corporate tool. That's why 40% of IT helpdesk tickets are dedicated to password resets.

### Magic Links

ClaimFlow utilizes enterprise-grade **Magic Link Authentication** powered by Supabase.

When an employee needs to submit a claim, they just type their corporate email. We instantly shoot them a secure, one-time-use link. They tap it on their phone, and they are inside the dashboard.

It's that simple. Zero friction, zero forgotten passwords.`
    },
    {
        title: "100% LHDN Compliant: Exporting Data with Confidence",
        slug: "lhdn-compliant-exports",
        description: "Navigating Malaysian tax law doesn't have to be stressful. Our automated CSV exports ensure every single claim is documented exactly as LHDN requires.",
        author: "Lichai",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop",
        image_url: "/blog/lhdn.png",
        created_at: "2026-01-22T10:45:00Z",
        content: `## The Audit Paranoia

If LHDN knocks on your door tomorrow, could you instantly provide the exact business context, distance, and time for a mileage claim submitted 8 months ago? Probably not.

### Structured CSV Exports

ClaimFlow forces employees to fill out the strict data requirements *before* they can hit submit. This data sits securely in our database.

When HR needs to run payroll, they just hit **Export to CSV**. Our algorithm instantly formats all approved claims into the pristine layout that Malaysian tax auditors expect. Sleep soundly knowing you're fully covered.`
    },
    {
        title: "Catching Fraud: The Anomaly Flagging Engine",
        slug: "anomaly-detection-claims",
        description: "A deep dive into how our smart validation engine catches duplicate receipts and suspicious mileage over-reports before they reach your manager's desk.",
        author: "Alicia",
        avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&auto=format&fit=crop",
        image_url: "/blog/anomaly.png",
        created_at: "2026-01-08T16:20:00Z",
        content: `## Trust, but Verify

Corporate expense fraud costs companies billions globally. Even simple 'rounding up' of mileage accounts for thousands of Ringgit in leaked revenue per year.

### Automated Anomaly Detection

ClaimFlow isn't just a digital filing cabinet. Our submission engine runs validations on every entry.

If an employee claims 150km for a trip between Kuala Lumpur and Petaling Jaya, our engine instantly cross-references the geographic coordinates and flags the entry as an **Anomaly**.

The employee is then forced to provide a written justification *before* submission, drastically cutting down on casual expense padding.`
    }
];

async function seed() {
    console.log('Clearing old posts...');
    await supabase.from('blog_posts').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    console.log('Inserting 5 new app-specific blog posts...');
    const { data, error } = await supabase.from('blog_posts').insert(articles).select();

    if (error) {
        console.error('Error inserting posts:', error);
    } else {
        console.log(`Successfully inserted ${data.length} blog posts into Supabase!`);
    }
}

seed();
