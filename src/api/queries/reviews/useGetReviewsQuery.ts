import { useQuery } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { ReviewResponse } from '@/types/reviews.types';

function useGetReviewsQuery(accommodationId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.accomodationReviews, accommodationId],

    queryFn: async () => {
      const { data } = await httpClient.get<ReviewResponse>(
        ENDPOINTS.accommodation.getAccommodationReviews(accommodationId)
      );
      return data;
    },
  });
}

export default useGetReviewsQuery;
