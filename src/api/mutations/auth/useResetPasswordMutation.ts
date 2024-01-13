import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { ROUTES } from '@src/config/routes.config';
import { CommonResponse, ResetPasswordReq } from '@src/types/auth.types';

function useResetPasswordMutation(token = '' as string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: ResetPasswordReq) => {
      const { data } = await httpClient.patch<CommonResponse>(ENDPOINTS.auth.resetPassword, {
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
