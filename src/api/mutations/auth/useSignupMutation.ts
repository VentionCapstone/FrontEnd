import { useMutation } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { SignUpReq } from '@src/types/auth.types';

const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (values: SignUpReq) => {
      await httpClient.post(ENDPOINTS.auth.signUp, values);
    },
  });
};

export default useSignupMutation;
