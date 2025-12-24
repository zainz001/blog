// store/posts/postSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostState, Post } from './postTypes';
import { fetchPosts, fetchPostById, createPost, updatePost, deletePost } from './postThunks';

const initialState: PostState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPost(state) {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => { state.posts = action.payload; state.loading = false; })
      .addCase(fetchPosts.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed to load posts'; })

      .addCase(fetchPostById.pending, (state) => { state.loading = true; state.currentPost = null; })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => { state.currentPost = action.payload; state.loading = false; })
      .addCase(fetchPostById.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Post not found'; })

      // Create
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create post';
      })

      // ========================
      // UPDATE POST
      // ========================
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.posts = state.posts.map(p =>
          p.id === action.payload.id ? action.payload : p
        );

        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update post';
      })

      // ========================
      // DELETE POST
      // ========================
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.posts = state.posts.filter(p => p.id !== action.payload);

        if (state.currentPost?.id === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete post';
      });

  },
});

export const { clearCurrentPost } = postSlice.actions;
export default postSlice.reducer;
