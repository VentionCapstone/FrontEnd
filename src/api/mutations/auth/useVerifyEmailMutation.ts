import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { ROUTES } from '@src/config/routes.config';
import { ToastMessages } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';

function useVerifyEmailMutation(token: string) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.verifyEmail],
    mutationFn: async () => {
      await httpClient.post<string>(ENDPOINTS.auth.verifyEmail, { token });
    },
    onSuccess: () => {
      toast.success(t(ToastMessages.email_verified));
      navigate(ROUTES.auth.signIn);
    },
  });
}

export default useVerifyEmailMutation;
