import { useQuery } from '@tanstack/react-query';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { QUERY_KEYS } from '../../../config/react-query.config';
import httpClient from '../../httpClient';
import { ReviewResponse } from '../../../types/reviews.types';

function useGetReviewsQuery(accommodationId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.accomodationReviews],

    queryFn: async () => {
      const { data } = await httpClient.get<ReviewResponse>(
        EndpointsConfig.accommodation.getAccommodationReviws(accommodationId)
      );
      return data;
    },
  });
}

export default useGetReviewsQuery;
