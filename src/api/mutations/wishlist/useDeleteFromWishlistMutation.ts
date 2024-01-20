import { useMutation } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { CommonResponse } from '@src/types/auth.types';

function useDeleteFromWishlistMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.deleteFromWishlist],

    mutationFn: async (wishlistId: string) => {
      const { data } = await httpClient.post<CommonResponse>(
        ENDPOINTS.wishlist.deleteFromWishlist(wishlistId)
      );
      return data;
    },
  });
}

export default useDeleteFromWishlistMutation;
