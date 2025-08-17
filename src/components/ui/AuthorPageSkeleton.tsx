import { Skeleton } from "@/components/ui/Skeleton";

export function AuthorPageSkeleton () {
    return (
        <article className="space-y-6">
            <div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-2 h-7 w-2/3" />
                <Skeleton className="mt-2 h-20 w-full" />
            </div>

            <div className="rounded-lg border bg-white p-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="mt-2 h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
            </div>

            <section>
                <Skeleton className="h-5 w-40" />
                <ul className="mt-3 space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <li key={i} className="rounded-lg border bg-white p-3 space-y-2">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    )
}
