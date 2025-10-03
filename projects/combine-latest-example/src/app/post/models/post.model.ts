export interface Post {
    id: string;
    title: string;
    views: number;
    description?: string;
}

export type PostForUpdate = Pick<Post, "id"> & Partial<Post>;