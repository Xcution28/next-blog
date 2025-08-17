import type { GetServerSideProps } from 'next';
import PostCard from '@/components/posts/PostCard';
import Pagination from '@/components/posts/Pagination';
import SearchBox from '@/components/posts/SearchBox';
import { fetchPosts } from '@/lib/api';
import { Post } from "@/lib/types";
import { usePageLoading } from '@/components/hooks/usePageLoading';
import { PostsPageSkeleton } from "@/components/ui/PostsPageSkeleton";

const LIMIT = 10;

export default function PostsPage({ posts, total, page, q }:{ posts: Post[]; total: number; page: number; q?: string|null }) {
        const loading = usePageLoading();

    return (
        <div className="space-y-4">
            <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold">Posts</h1>
                </div>
                <div className="w-full sm:w-80">
                    <SearchBox q={ q ?? undefined } />
                </div>
            </div>

            { loading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    { Array.from({ length: 9 }).map((_, i) => <PostsPageSkeleton key={i} />) }
                </div>
            ) : posts.length === 0 ? (
                <p className="text-gray-600">Ничего не найдено.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    { posts.map((post) => (
                        <PostCard key={ post.id } post={ post } />
                    )) }
                </div>
            ) }

            <Pagination page={ page } total={ total } limit={ LIMIT } q={ q ?? undefined } />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const page = Number((ctx.query.page as string) ?? '1');
    const q = (ctx.query.q as string) ?? null;
    const { posts, total } = await fetchPosts({ page, limit: LIMIT, q });

    return { props: { posts, total, page, q } };
};
