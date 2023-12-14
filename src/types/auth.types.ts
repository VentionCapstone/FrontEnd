import { User } from './profile.types';

export type AuthState = {
  token: string | null;
  user: User | null;
};

export type RefreshingPromise = { access_token: string } | { error: Error };

export type isRefreshingType = Promise<RefreshingPromise> | boolean;

export interface RefreshResponse {
  tokens: Tokens;
  message: string;
}
export interface Tokens {
  access_token: string;
  refresh_token: string;
}
