// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import postReducer from './posts/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
