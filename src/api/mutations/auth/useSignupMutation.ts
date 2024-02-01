import { useMutation } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { ROUTES } from '@src/config/routes.config';
import { SignUpReq } from '@src/types/auth.types';
import { useNavigate } from 'react-router-dom';

const useSignupMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values: SignUpReq) => {
      await httpClient.post(ENDPOINTS.auth.signUp, values);
    },
    onSuccess: () => {
      navigate(ROUTES.auth.confirmEmail);
    },
  });
};

export default useSignupMutation;
