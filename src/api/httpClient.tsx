import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { store } from '../stores/store';
import toast from 'react-hot-toast';
import { ErrorResponse } from '../types/error.types';

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

    return axios(originalRequest);
  } else {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    toast.error(message);
  }
  return Promise.reject(error);
}

httpClient.interceptors.request.use(reqInterceptor, reqErrInterceptor);
httpClient.interceptors.response.use(resInterceptor, resErrInterceptor);

export default httpClient;
