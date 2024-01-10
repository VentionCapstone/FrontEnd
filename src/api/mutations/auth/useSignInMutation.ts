import { useMutation } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { setToken } from '@/stores/slices/authSlice';
import { AuthData, LoginResponse } from '@/types/auth.types';

const useSignInMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation<LoginResponse, unknown, AuthData>({
    mutationFn: async (data: AuthData) => {
      const response = await httpClient.post<LoginResponse>(ENDPOINTS.auth.signIn, data);
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('sub', data.id);
      dispatch(setToken(data.tokens.access_token));
    },
  });
};

export default useSignInMutation;
