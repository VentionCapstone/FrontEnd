import { useMutation } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { Profile } from '@src/types/profile.types';

function useCreateAccountMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.createAccount],
    mutationFn: async (profileToSave: Profile) => {
      const { data } = await httpClient.post<Profile>(
        ENDPOINTS.account.createUserProfile,
        profileToSave
      );

      return data;
    },
  });
}

export default useCreateAccountMutation;
