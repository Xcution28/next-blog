'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBox({ q: initialQ }: { q?: string }) {
    const router = useRouter();
    const [q, setQ] = useState(initialQ ?? '');

    useEffect(() => {
        // самодельный debounce
        const t = setTimeout(() => {
            const searchParams = new URLSearchParams(router.query as Record<string, string>);
            if (q) searchParams.set('q', q); else searchParams.delete('q');
            searchParams.set('page', '1');
            router.push(`/posts?${searchParams.toString()}`, undefined, { scroll: false });
        }, 300);

        return () => clearTimeout(t);
    }, [q]);

    return (
        <div className="relative">
            <input
                placeholder="Поиск по заголовку…"
                value={ q }
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-gray-400"
            />
            { q && (
                <button
                    aria-label="Очистить"
                    onClick={ () => setQ('') }
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
                >
                    ✕
                </button>
            )}
        </div>
    );
}
