import Link from 'next/link';
import type { Post } from '@/lib/types';

export default function PostCard({ post }: { post: Post }) {
    const preview = post.body.slice(0, 100) + (post.body.length > 100 ? '…' : '');

    return (
        <article className="flex h-full flex-col rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
            <h2 className="line-clamp-2 text-lg font-semibold leading-snug">{ post.title }</h2>
            <p className="mt-2 line-clamp-3 text-sm text-gray-600">{ preview }</p>
            <div className="mt-auto pt-3">
                <Link href={`/posts/${post.id}`} className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50">Подробнее →</Link>
            </div>
        </article>
    );
}
