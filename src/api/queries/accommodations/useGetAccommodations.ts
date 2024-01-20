import { useInfiniteQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { AMOUNT_PER_PAGE } from '@src/config/pagination.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { AccommodationRes } from '@src/types/accommodation.types';

export const useGetAccommodations = (id: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.query.accommodations],
    queryFn: async ({ pageParam }) => {
      const { data } = await httpClient.get<AccommodationRes>(
        ENDPOINTS.accommodation.getUserAccommodations(id),
        {
          params: {
            page: pageParam,
            limit: AMOUNT_PER_PAGE,
          },
        }
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.totalCount / AMOUNT_PER_PAGE) {
        return pages.length + 1;
      }
      return;
    },
    enabled: !!id,
  });
};
