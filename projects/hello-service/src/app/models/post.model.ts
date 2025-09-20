export interface Post {
    id: string;
    readonly title: string;
    views: number;
}

export type CreatePost  = Omit<Post, 'id'>;