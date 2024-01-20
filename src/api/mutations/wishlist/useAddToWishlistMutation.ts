import { useMutation } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { CommonResponse } from '@src/types/auth.types';

function useAddToWishlistMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.addToWishlist],

    mutationFn: async (accommodationId: string) => {
      const { data } = await httpClient.post<CommonResponse>(
        ENDPOINTS.wishlist.addToWishlist(accommodationId)
      );
      return data;
    },
  });
}

export default useAddToWishlistMutation;
