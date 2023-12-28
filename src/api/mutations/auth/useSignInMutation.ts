import { useMutation } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { AuthData, LoginResponse } from '../../../types/auth.types';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { setToken } from '../../../stores/slices/authSlice';
import { EndpointsConfig } from '../../../config/endpoints.config';

const useSignInMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation<LoginResponse, unknown, AuthData>({
    mutationFn: async (data: AuthData) => {
      const response = await httpClient.post<LoginResponse>(EndpointsConfig.Auth.SignIn, data);
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('sub', data.id);
      dispatch(setToken(data.tokens.access_token));
    },
  });
};

export default useSignInMutation;
