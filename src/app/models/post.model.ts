import { Comment } from './comment.model';

export interface Post {
    body: string;
    id: number;
    title: string;
    userId: number;
    showComments?: boolean;
    comments?: Comment[];
}
