import { useQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { WishlistResponse } from '@src/types/wishlist.types';

function useGetWishlistQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.query.wishlist],

    queryFn: async () => {
      const {
        data: { data },
      } = await httpClient.get<WishlistResponse>(ENDPOINTS.wishlist.root);
      return data;
    },
  });
}

export default useGetWishlistQuery;
