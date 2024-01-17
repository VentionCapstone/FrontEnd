import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { CommonResponse, SignUpReq } from '@src/types/auth.types';

const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (values: SignUpReq) => {
      const { data } = await httpClient.post<CommonResponse>(ENDPOINTS.auth.signUp, values);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
};

export default useSignupMutation;
