import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { ROUTES } from '@/config/routes.config';

function useVerifyEmailMutation(token: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.verifyEmail],
    mutationFn: async () => {
      await httpClient.post<string>(ENDPOINTS.auth.verifyEmail, { token });
    },
    onSuccess: () => {
      toast.success('Email verified');
      navigate(ROUTES.auth.signIn);
    },
  });
}

export default useVerifyEmailMutation;
