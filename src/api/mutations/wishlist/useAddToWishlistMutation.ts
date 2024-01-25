import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { CommonResponse } from '@src/types/auth.types';

function useAddToWishlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.addToWishlist],

    mutationFn: async (accommodationId: string) => {
      const { data } = await httpClient.post<CommonResponse>(
        ENDPOINTS.wishlist.addToWishlist(accommodationId)
      );
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.wishlist],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.accommodations],
      });
    },
  });
}

export default useAddToWishlistMutation;
