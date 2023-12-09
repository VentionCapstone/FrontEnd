import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth.types';

const initialState: AuthState = {
  token: null || localStorage.getItem('access_token'),
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
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
