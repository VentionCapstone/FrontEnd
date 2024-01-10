import { useQuery } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { QUERY_KEYS } from '../../../config/react-query.config';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { AccommodationSingleResponse } from '../../../types/accommodation.types';

function useGetSingleAccommodationQuery(accommodationId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.accommodation, accommodationId],
    queryFn: async () => {
      const { data } = await httpClient.get<AccommodationSingleResponse>(
        EndpointsConfig.Accommodations.GetAccommodation(accommodationId)
      );
      return data.data;
    },
  });
}

export default useGetSingleAccommodationQuery;
