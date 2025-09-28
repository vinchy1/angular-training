export interface Post {
  id: string;
  title: string;
  content: string;
  views: number;
}

export type CreatePost = Omit<Post, 'id'>;

export type UpdatePost = Pick<Post, 'id'> & Partial<CreatePost>;
