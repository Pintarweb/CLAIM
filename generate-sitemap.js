import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');
const BASE_URL = 'https://claimflow.com';

async function generateSitemap() {
    console.log('Generating sitemap...');

    const urls = [
        { loc: `${BASE_URL}/`, priority: '1.0' },
        { loc: `${BASE_URL}/blog`, priority: '0.9' }
    ];

    if (!supabaseUrl || !supabaseKey) {
        console.warn('Missing Supabase credentials, skipping dynamic sitemap links.');
    } else {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data: posts, error } = await supabase.from('blog_posts').select('slug, created_at');

        if (!error && posts) {
            posts.forEach(post => {
                urls.push({
                    loc: `${BASE_URL}/blog/${post.slug}`,
                    lastmod: new Date(post.created_at).toISOString().split('T')[0],
                    priority: '0.8'
                });
            });
        }
    }

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(SITEMAP_PATH, sitemapContent);
    console.log(`✅ Sitemap successfully generated with ${urls.length} URLs at ${SITEMAP_PATH}`);
}

generateSitemap();
