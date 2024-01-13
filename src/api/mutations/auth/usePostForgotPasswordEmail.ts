import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ROUTES } from '@src/config/routes.config';

function usePostForgotPasswordEmail() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await httpClient.post<{ success: boolean; message: 'string' }>(
        '/auth/forgot-password-email',
        { email }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(ROUTES.root);
    },
  });
}

export default usePostForgotPasswordEmail;
