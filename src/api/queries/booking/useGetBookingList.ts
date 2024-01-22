import { useInfiniteQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { AMOUNT_PER_PAGE } from '@src/config/pagination.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { BookListResponse } from '@src/types/booking.types';

export const useGetBookingList = (status?: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.query.bookings, status],
    queryFn: async ({ pageParam }) => {
      const { data } = await httpClient.get<BookListResponse>(ENDPOINTS.booking.getBookingList, {
        params: {
          page: pageParam,
          limit: AMOUNT_PER_PAGE,
          status,
        },
      });

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.totalCount / AMOUNT_PER_PAGE) {
        return pages.length + 1;
      }
      return;
    },
  });
};
