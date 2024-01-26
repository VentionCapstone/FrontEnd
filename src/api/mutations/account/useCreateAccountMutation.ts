import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { ROUTES } from '@src/config/routes.config';
import { ToastMessages } from '@src/types/i18n.types';
import { Profile } from '@src/types/profile.types';
import { useTranslation } from 'react-i18next';
function useCreateAccountMutation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.createAccount],
    mutationFn: async (profileToSave: Profile) => {
      await httpClient.post(ENDPOINTS.account.createUserProfile, profileToSave);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.user] });
      navigate(ROUTES.account.root);
      toast.success(`${t(ToastMessages.SuccessProfile)}`);
    },
  });
}

export default useCreateAccountMutation;
