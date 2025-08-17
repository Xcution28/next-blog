export function PostsPageSkeleton() {
    return (
        <article className="flex h-full flex-col rounded-xl border bg-white p-4 shadow-sm">
            <div className="h-5 w-3/4 animate-pulse rounded-md bg-gray-200" />
            <div className="mt-2 space-y-2">
                <div className="h-4 w-full animate-pulse rounded-md bg-gray-200" />
                <div className="h-4 w-2/3 animate-pulse rounded-md bg-gray-200" />
            </div>
            <div className="mt-auto pt-3">
                <div className="h-8 w-28 animate-pulse rounded-lg bg-gray-200" />
            </div>
        </article>
    );
}
