import { useQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { ReviewResponse } from '@src/types/reviews.types';

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
