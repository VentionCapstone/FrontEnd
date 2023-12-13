import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { UserResponse } from '../../types/profile.types';
import { AuthState } from '../../types/auth.types';

const initialState: AuthState = {
  token: localStorage.getItem('access_token'),
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('access_token', action.payload);
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem('access_token');
    },
    setUser: (state, action: PayloadAction<UserResponse>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('sub');
    },
  },
});

export const { setToken, removeToken, setUser, removeUser, logout } = authSlice.actions;

export default authSlice.reducer;
