import { useMutation } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { useAppDispatch } from '@src/hooks/redux-hooks';
import i18n from '@src/i18n/i18n';
import { setToken } from '@src/stores/slices/authSlice';
import { LoginResponse } from '@src/types/auth.types';
import { ErrorTypes } from '@src/types/i18n.types';
import { setValueToLocalStorage } from '@src/utils';
import toast from 'react-hot-toast';

const useGoogleSignInMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (token: string) => {
      const { data } = await httpClient.post<LoginResponse>(ENDPOINTS.auth.googleSignIn, { token });

      return data;
    },
    onSuccess: (data) => {
      setValueToLocalStorage(LOCAL_STORAGE_KEYS.sub, data.id);
      dispatch(setToken(data.tokens.access_token));
    },
    onError: () => {
      toast.error(i18n.t(ErrorTypes.default));
    },
  });
};

export default useGoogleSignInMutation;
