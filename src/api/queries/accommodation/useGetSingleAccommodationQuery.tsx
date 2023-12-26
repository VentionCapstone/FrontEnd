import { useQuery } from '@tanstack/react-query';
import { AccommodationResponse } from '../../../types/accommodations.types';
import httpClient from '../../httpClient';

function useGetSingleAccommodationQuery(accommodationId: string) {
  return useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      const { data } = await httpClient.get<AccommodationResponse>(
        `/accommodations/${accommodationId}`
      );
      return data.data;
    },
  });
}

export default useGetSingleAccommodationQuery;
