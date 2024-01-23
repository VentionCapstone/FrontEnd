import { useMutation } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';

function useUpdateAccountImageMutation(imageFile: File | null) {
  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.updateUserImage],

    mutationFn: async (profileId: string | undefined) => {
      if (!imageFile || !profileId) return;

      const formData = new FormData();
      formData.append('image', imageFile);

      await httpClient.post(ENDPOINTS.account.updateProfileImage(profileId), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  });
}

export default useUpdateAccountImageMutation;
