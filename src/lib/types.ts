export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string
};

export type User = {
    id: number;
    name: string;
    username: string;
    email: string
};

export type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string
};

export type PaginationProps = {
    page: number;
    total: number;
    limit: number;
    q?: string | null;
    siblings?: number;
    path?: string;
};
