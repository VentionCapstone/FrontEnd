import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth.types';
import { ProfileResponse } from '../../types/profile.types';

const initialState: AuthState = {
  token: null || localStorage.getItem('access_token'),
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
    setProfile: (state, action: PayloadAction<ProfileResponse>) => {
      state.user = action.payload;
    },
    removeProfile: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('access_token');
    },
  },
});

export const { setToken, removeToken, setProfile, removeProfile, logout } = authSlice.actions;

export default authSlice.reducer;
