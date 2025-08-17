import type { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { fetchCommentsForPost, fetchPost, fetchUser } from '@/lib/api';
import { Comment, Post, User } from "@/lib/types";
import { usePageLoading } from "@/components/hooks/usePageLoading";
import {AuthorPageSkeleton} from "@/components/ui/AuthorPageSkeleton";

export default function PostPage({ post, user, comments }:{ post: Post; user: User; comments: Comment[] }) {
    const loading = usePageLoading();

    if (loading) {
        return (
            <AuthorPageSkeleton />
        );
    }

    return (
        <article className="space-y-6">
            <div>
                <Link href="/posts" className="text-sm text-gray-500 hover:text-gray-800">← To the list of authors</Link>
                <h1 className="mt-2 text-2xl font-semibold leading-tight">{ post.title }</h1>
                <p className="mt-2 text-gray-700">{ post.body }</p>
            </div>

            <div className="rounded-lg border bg-white p-4">
                <h2 className="text-lg font-semibold">Author</h2>
                <p className="mt-1 text-gray-700">{ user.name }</p>
                <p className="text-sm text-gray-500">@{ user.username } · { user.email }</p>
            </div>

            <section>
                <h2 className="text-lg font-semibold">Comments ({ comments.length })</h2>
                <ul className="mt-3 space-y-3">
                    { comments.map((comment) => (
                        <li key={ comment.id } className="rounded-lg border bg-white p-3">
                            <p className="font-medium">{ comment.name }</p>
                            <p className="text-sm text-gray-600">{ comment.email }</p>
                            <p className="mt-1 text-gray-700">{ comment.body }</p>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    const paths = posts.slice(0, 20).map((p: any) => ({ params: { id: String(p.id) } }));

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = Number(params!.id);
    const post = await fetchPost(id);

    if (!post) return { notFound: true, revalidate: 60 };

    const [user, comments] = await Promise.all([
        fetchUser(post.userId),
        fetchCommentsForPost(id),
    ]);

    return { props: { post, user, comments }, revalidate: 600 };
};
