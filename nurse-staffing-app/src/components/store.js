import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './store/layout'; 
import authSlice from './store/authSlice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    authSlice: authSlice,
  },
});

