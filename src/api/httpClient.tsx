import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import toast from 'react-hot-toast';

import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { DEFAULT_LANGUAGE } from '@src/constants';
import i18n from '@src/i18n/i18n';
import { logout, setToken } from '@src/stores/slices/authSlice';
import { store } from '@src/stores/store';
import { RefreshResponse, RefreshingPromise, isRefreshingType } from '@src/types/auth.types';
import { ErrorResponse } from '@src/types/error.types';
import { ErrorTypes, ToastMessages } from '@src/types/i18n.types';
import { getValueFromLocalStorage } from '@src/utils';

let isRefreshing: isRefreshingType = false;

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
});

// REQUEST INTERCEPTORS
function reqInterceptor(config: InternalAxiosRequestConfig) {
  const token =
    store.getState().auth.token || getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.accessToken);

  if (token) config.headers['Authorization'] = `Bearer ${token}`;

  const lang =
    getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.language) ||
    navigator.language ||
    DEFAULT_LANGUAGE;

  config.params = {
    ...(config.params as Record<string, unknown>),
    lang,
  };

  return config;
}

function reqErrInterceptor(error: AxiosError) {
  console.error(error);
  return Promise.reject(error);
}

// RESPONSE INTERCEPTORS
function resInterceptor(response: AxiosResponse) {
  return response;
}

async function resErrInterceptor(error: AxiosError<ErrorResponse>) {
  if (error.response?.status === 401) {
    const originalRequest = error.config as AxiosRequestConfig;

    if (!isRefreshing) {
      // If not already refreshing, initiate token refresh
      isRefreshing = refreshAccessToken().then((res) => {
        if ('error' in res) {
          store.dispatch(logout());
          httpClient.defaults.headers.common['Authorization'] = '';
          toast.error(i18n.t(ToastMessages.ErrorSessionExpired));

          return res;
        }

        store.dispatch(setToken(res.access_token));

        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers['Authorization'] = `Bearer ${res.access_token}`;

        // Retry the original request with the new token
        return axios(originalRequest);
      });

      try {
        const res = await isRefreshing;

        isRefreshing = false;

        return res;
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
  } else {
    // Handle other error cases
    let info: string | undefined;

    if (Array.isArray(error.response?.data?.error.message)) {
      info = error.response?.data?.error.message.join(', ');
    } else {
      info = error.response?.data?.error.message;
    }
    const defaultMessage: string = i18n.t(ErrorTypes.default);
    const message = info || error.message || defaultMessage;
    toast.error(message);
  }

  // Reject the original error if it's not a 401 or if token refresh is already in progress
  return Promise.reject(error);
}

const refreshAccessToken = async (): Promise<RefreshingPromise> => {
  const userId = getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.sub);
  try {
    const response = await axios.get<RefreshResponse>(
      `${import.meta.env.VITE_API_URL}/auth/${userId}/refresh`,
      {
        withCredentials: true,
      }
    );
    const {
      tokens: { access_token },
    } = response.data;

    return { access_token };
  } catch (error: unknown) {
    return { error: error as Error };
  }
};

httpClient.interceptors.request.use(reqInterceptor, reqErrInterceptor);
httpClient.interceptors.response.use(resInterceptor, resErrInterceptor);

export default httpClient;
