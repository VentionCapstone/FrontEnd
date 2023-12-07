import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import toast from 'react-hot-toast';
import { store } from '../stores/store';
import { ErrorResponse } from '../types/error.types';
import { removeToken, setToken } from '../stores/slices/authSlice';
import { RefreshResponse, RefreshingPromise, isRefreshingType } from '../types/auth.types';

let isRefreshing: isRefreshingType = false;

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

// REQUEST INTERCEPTORS
function reqInterceptor(config: InternalAxiosRequestConfig) {
  const token = store.getState().auth.token || localStorage.getItem('access_token');

  if (token) config.headers['Authorization'] = `Bearer ${token}`;

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
    if (isRefreshing) {
      const res = await isRefreshing;

      if (typeof res === 'object' && 'access_token' in res) {
        return axios({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${res.access_token}`,
          },
        });
      }

      return Promise.reject(error);
    }

    isRefreshing = refreshAccessToken().then((res) => {
      if ('error' in res) {
        store.dispatch(removeToken());
        httpClient.defaults.headers.common['Authorization'] = '';
        toast.error('Your session has expired. Please login again.');

        return res;
      }

      store.dispatch(setToken(res.access_token));

      if (!originalRequest.headers) originalRequest.headers = {};
      originalRequest.headers['Authorization'] = `Bearer ${res.access_token}`;

      return res;
    });

    await isRefreshing;
    isRefreshing = false;

    return axios(originalRequest);
  } else {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    toast.error(message);
  }
  return Promise.reject(error);
}

const refreshAccessToken = async (): Promise<RefreshingPromise> => {
  const userId = localStorage.getItem('sub');
  try {
    const response = await httpClient.get<RefreshResponse>(`/auth/${userId}/refresh`);

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
export { refreshAccessToken };
