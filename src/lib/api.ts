import type { Post, User, Comment } from './types';

const BASE = 'https://jsonplaceholder.typicode.com';

export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, init);
    if (!res.ok) throw new Error(`request failed: ${res.status}`);

    return res.json() as Promise<T>;
}

export async function fetchPosts({ page, limit, q }:{ page:number; limit:number; q?:string|null }) {
    const params = new URLSearchParams();

    params.set('_page', String(page));
    params.set('_limit', String(limit));

    if (q) params.set('title_like', q);

    const url = `${BASE}/posts?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error('failed to fetch posts');

    const total = Number(res.headers.get('x-total-count') ?? '100');
    const posts = (await res.json()) as Post[];

    return { posts, total };
}

export async function fetchPost(id: number): Promise<Post | null> {
    const res = await fetch(`${BASE}/posts/${id}`);

    if (!res.ok) throw new Error('failed to fetch post');

    return (await res.json()) as Post;
}

export const fetchUser = (id:number) => apiFetch<User>(`${BASE}/users/${id}`);
export const fetchCommentsForPost = (id:number) => apiFetch<Comment[]>(`${BASE}/posts/${id}/comments`);
