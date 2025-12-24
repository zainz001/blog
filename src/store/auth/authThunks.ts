import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import { User } from './authTypes';

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await API.post('/auth/login', data);

    // Save token & user info
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    return res.data.user as User;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || 'Login failed');
  }
});

export const register = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await API.post('/auth/register', data);

    // Save user info (optional)
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);

    return res.data.user as User;
  } catch (err: any) {
    // console.log(err);
    
    return rejectWithValue(err.response?.data?.error || 'Registration failed');
  }
});
