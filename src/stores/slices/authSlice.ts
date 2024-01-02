import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/user.types';
import { AuthState } from '../../types/auth.types';
import { RootState } from '../store';
import { LOCAL_STORAGE_KEYS } from '../../config/local-storage.config';
import { setValueToLocalStorage, getValueFromLocalStorage } from '../../utils';

const initialState: AuthState = {
  token: getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.accessToken),
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      setValueToLocalStorage(LOCAL_STORAGE_KEYS.accessToken, action.payload);
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.sub);
    },
  },
});

export const { setToken, removeToken, setUser, removeUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const getUser = (state: RootState) => state.auth.user;
export const getProfile = (state: RootState) => state.auth.user?.profile;
export const hasToken = (state: RootState) => state.auth.token !== null;
export const getTheme = (state: RootState) => state.auth.user?.profile?.uiTheme;
