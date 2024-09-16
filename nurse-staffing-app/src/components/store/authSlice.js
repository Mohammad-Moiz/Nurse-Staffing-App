// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false, // Set your initial authentication state here
  // other auth-related state properties can be added here
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    // other auth-related reducers can be added here
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
