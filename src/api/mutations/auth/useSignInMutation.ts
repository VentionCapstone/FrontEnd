import { useMutation } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { useAppDispatch } from '@src/hooks/redux-hooks';
import { setToken } from '@src/stores/slices/authSlice';
import { AuthData, LoginResponse } from '@src/types/auth.types';

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
