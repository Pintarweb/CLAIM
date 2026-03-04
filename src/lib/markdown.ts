import { supabase } from './supabase';

export interface BlogPostMeta {
    title: string;
    date: string;
    description: string;
    slug: string;
    author: string;
    image_url?: string;
    avatar_url?: string;
}

export interface BlogPost {
    meta: BlogPostMeta;
    content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }

    return (data || []).map(post => ({
        meta: {
            title: post.title,
            date: post.created_at,
            description: post.description,
            slug: post.slug,
            author: post.author,
            image_url: post.image_url,
            avatar_url: post.avatar_url,
        },
        content: post.content
    }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        if (error?.code !== 'PGRST116') {
            console.error(`Error fetching post ${slug}:`, error);
        }
        return null;
    }

    return {
        meta: {
            title: data.title,
            date: data.created_at,
            description: data.description,
            slug: data.slug,
            author: data.author,
            image_url: data.image_url,
            avatar_url: data.avatar_url,
        },
        content: data.content
    };
}
