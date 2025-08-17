import Link from 'next/link';
import type { PaginationProps } from '@/lib/types';

export default function Pagination({ page, total, limit, q, siblings = 1, path = '/posts', }: PaginationProps) {
    const pages = Math.max(1, Math.ceil(total / limit));

    const buildPageLink = (page: number) => {
        const searchParams = new URLSearchParams();
        if (q) searchParams.set('q', q);
        searchParams.set('page', String(page));

        return `${path}?${searchParams.toString()}`;
    };

    const start = Math.max(1, page - siblings);
    const end   = Math.min(pages, page + siblings);

    const range: (number | 'dots')[] = [];

    if (start > 1) {
        range.push(1);
        if (start > 2) range.push('dots');
    }

    for (let p = start; p <= end; p++) range.push(p);

    if (end < pages) {
        if (end < pages - 1) range.push('dots');
        range.push(pages);
    }

    const Prev = () =>
        page > 1 ? (
            <Link
                href={buildPageLink(page - 1)}
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
                aria-label="Previous page"
                rel="prev"
            >
                ‹ Previous
            </Link>
        ) : (
            <span
                className="rounded-md border px-3 py-1.5 text-sm opacity-50"
                aria-disabled="true"
            >
        ‹ Previous
      </span>
        );

    const Next = () =>
        page < pages ? (
            <Link
                href={buildPageLink(page + 1)}
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
                aria-label="Next page"
                rel="next"
            >
                Next ›
            </Link>
        ) : (
            <span
                className="rounded-md border px-3 py-1.5 text-sm opacity-50"
                aria-disabled="true"
            >
        Next ›
      </span>
        );

    return (
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
            <Prev />
            { range.map((it, idx) =>
                it === 'dots' ? (
                    <span key={`dots-${idx}`} className="px-2 text-sm text-gray-500">…</span>
                ) : (
                    <Link
                        key={it}
                        href={buildPageLink(it)}
                        className={`rounded-md border px-3 py-1.5 text-sm ${
                            it === page ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'
                        }`}
                        aria-current={it === page ? 'page' : undefined}
                    >
                        {it}
                    </Link>
                )
            ) }
            <Next />
        </nav>
    );
}
