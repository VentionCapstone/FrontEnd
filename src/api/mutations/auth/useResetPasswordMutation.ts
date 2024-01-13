import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ROUTES } from '@src/config/routes.config';
import { CommonResponse, ResetPasswordReq } from '@src/types/auth.types';

function useResetPasswordMutation(token = '' as string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: ResetPasswordReq) => {
      const { data } = await httpClient.patch<CommonResponse>('/auth/forgot-password-reset', {
        ...values,
        token,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(ROUTES.auth.signIn);
    },
  });
}

export default useResetPasswordMutation;
