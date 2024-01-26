import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { Profile } from '@src/types/profile.types';
import { ToastMessages } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';

function useEditAccountMutation(userId: string) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.editAccount],
    mutationFn: async (propertyToChange: Partial<Profile>) => {
      await httpClient.patch(ENDPOINTS.account.updateUserProfile(userId), propertyToChange);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.user] });
      toast.success(`${t(ToastMessages.SuccessUpdated)}`);
    },
  });
}

export default useEditAccountMutation;
