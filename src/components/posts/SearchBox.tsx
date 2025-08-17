'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBox({ q: initialQ }: { q?: string }) {
    const router = useRouter();
    const [q, setQ] = useState(initialQ ?? '');
    const timerRef = useRef<number | undefined>(undefined);

    const currentQueryString = useMemo(() => {
        const searchParams = new URLSearchParams(router.query as Record<string, string>);

        return searchParams.toString();
    }, [router.query]);

    useEffect(() => {
        if (!router.isReady) return;

        const next = new URLSearchParams(router.query as Record<string, string>);
        if (q) next.set('q', q); else next.delete('q');
        next.set('page', '1');

        const nextQs = next.toString();

        if (nextQs === currentQueryString) return;

        if (timerRef.current !== undefined) {
            window.clearTimeout(timerRef.current);
        }

        // самодельный debounce
        timerRef.current = window.setTimeout(() => {
            router.push(`/posts?${nextQs}`, undefined, {
                shallow: true,
                scroll: false,
            });
        }, 300);

        return () => {
            if (timerRef.current !== undefined) window.clearTimeout(timerRef.current);
        };
    }, [q, currentQueryString, router]);

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
