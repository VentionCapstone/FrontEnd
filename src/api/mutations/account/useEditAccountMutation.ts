import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { ProfileActions } from '@src/types/i18n.types';
import { Profile } from '@src/types/profile.types';
import { t } from 'i18next';

function useEditAccountMutation(profileId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.editAccount],
    mutationFn: async (propertyToChange: Partial<Profile>) => {
      await httpClient.patch(ENDPOINTS.account.updateUserProfile(profileId), propertyToChange);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.user] });
      toast.success(t(ProfileActions.profile_change));
    },
  });
}

export default useEditAccountMutation;
