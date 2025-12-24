export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export interface PostState {
  posts: Post[];
  currentPost: Post | null; // ← ADD THIS
  loading: boolean;
  error: string | null;
}
