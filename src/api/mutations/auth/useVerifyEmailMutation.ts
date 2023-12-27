import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import httpClient from '../../httpClient';
import { RoutesConfig } from '../../../config/routes.config';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { QUERY_KEYS } from '../../../config/react-query.config';

function useVerifyEmailMutation(token: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.verifyEmail],
    mutationFn: async () => {
      await httpClient.post<string>(EndpointsConfig.Auth.VerifyEmail, { token });
    },
    onSuccess: () => {
      toast.success('Email verified');
      navigate(RoutesConfig.Auth.SignIn);
    },
  });
}

export default useVerifyEmailMutation;
