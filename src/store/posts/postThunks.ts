import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import { Post } from './postTypes';

export const fetchPosts = createAsyncThunk<Post[], void>('posts/fetchPosts', async () => {
  const res = await API.get('/posts'); return res.data;
});

export const createPost = createAsyncThunk<Post, { title: string; content: string }>('posts/createPost', async (data) => {
  const res = await API.post('/posts', data); return res.data;
});

export const updatePost = createAsyncThunk<Post, { id: string; data: { title: string; content: string } }>('posts/updatePost', async ({ id, data }) => {
  const res = await API.put(`/posts/${id}`, data); return res.data;
});

export const deletePost = createAsyncThunk<string, string>('posts/deletePost', async (id) => {
  await API.delete(`/posts/${id}`); return id;
});
export const fetchPostById = createAsyncThunk<Post, string>(
  'posts/fetchPostById',
  async (id) => {
    const res = await API.get(`/posts/${id}`);
    return res.data;
  }
);
