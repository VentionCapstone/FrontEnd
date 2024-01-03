import { useQuery } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { AccommodationSingleResponse } from '../../../types/accommodation.types';

function useGetSingleAccommodationQuery(accommodationId: string) {
  return useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      const { data } = await httpClient.get<AccommodationSingleResponse>(
        EndpointsConfig.Accommodations.GetSingleAccommodation(accommodationId)
      );
      return data.data;
    },
  });
}

export default useGetSingleAccommodationQuery;
