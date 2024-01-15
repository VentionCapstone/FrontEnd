import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { useAppDispatch } from '@src/hooks/redux-hooks';
import { setToken } from '@src/stores/slices/authSlice';
import { LoginResponse, SignInReq } from '@src/types/auth.types';
import { setValueToLocalStorage } from '@src/utils';
import { useMutation } from '@tanstack/react-query';

const useSignInMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (values: SignInReq) => {
      const { data } = await httpClient.post<LoginResponse>(ENDPOINTS.auth.signIn, values);
      return data;
    },
    onSuccess: (data) => {
      setValueToLocalStorage(LOCAL_STORAGE_KEYS.sub, data.id);
      dispatch(setToken(data.tokens.access_token));
    },
  });
};

export default useSignInMutation;
