export type AuthState = {
  token: string | null;
};

export type RefreshingPromise = { access_token: string } | { error: Error };

export type isRefreshingType = Promise<RefreshingPromise> | boolean;

export interface RefreshResponse {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
  message: string;
}
