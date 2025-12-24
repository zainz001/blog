import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './authThunks';
import { User } from './authTypes';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Hydrate state from localStorage
const userFromStorage =
  typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

const initialState: AuthState = {
  user: userFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
