import { User } from './user.model';

export interface Comment {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
  user?: User;
}
