import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import httpClient from '../../httpClient';
import { VERIFY_EMAIL_ROUTE } from '../../routes';

function useVerifyEmailMutation(token: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['verify-email'],
    mutationFn: async () => {
      await httpClient.post<string>(VERIFY_EMAIL_ROUTE, { token });
    },
    onSuccess: () => {
      toast.success('Email verified');
      navigate('/auth/signin');
    },
  });
}

export default useVerifyEmailMutation;
