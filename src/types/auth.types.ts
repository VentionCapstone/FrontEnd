import { UserResponse } from './profile.types';

export type AuthState = {
  token: string | null;
  user: UserResponse | null;
};

export type AuthData = {
  email: string;
  password: string;
  confirm_password?: string;
};

export type RefreshingPromise = { access_token: string } | { error: Error };

export type isRefreshingType = Promise<RefreshingPromise> | boolean;

export interface RefreshResponse {
  tokens: Tokens;
  message: string;
}

export interface LoginResponse {
  tokens: Tokens;
  id: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}
