import { useQuery } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { AccommodationSingleResponse } from '@/types/accommodation.types';

function useGetSingleAccommodationQuery(accommodationId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.accommodation, accommodationId],
    queryFn: async () => {
      const data = await httpClient.get<AccommodationSingleResponse>(
        ENDPOINTS.accommodation.getAccommodation(accommodationId)
      );
      return data.data.data;
    },
  });
}

export default useGetSingleAccommodationQuery;
