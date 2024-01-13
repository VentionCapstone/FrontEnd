import { useMutation } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { useAppDispatch } from '@src/hooks/redux-hooks';
import { setToken } from '@src/stores/slices/authSlice';
import { LoginResponse, SignInReq } from '@src/types/auth.types';

const useSignInMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (values: SignInReq) => {
      const { data } = await httpClient.post<LoginResponse>(ENDPOINTS.auth.signIn, values);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('sub', data.id);
      dispatch(setToken(data.tokens.access_token));
    },
  });
};

export default useSignInMutation;
