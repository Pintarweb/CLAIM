import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLeads() {
    console.log('Testing leads table insert...');
    const { data, error } = await supabase.from('leads').insert({
        agency_name: 'Test Agency',
        email: 'test@example.com',
        interested_in_pilot: true
    }).select();

    console.log('Result:', { data, error: error?.message });
}
checkLeads();
