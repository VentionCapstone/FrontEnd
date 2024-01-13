import { useQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { AccommodationSingleResponse } from '@src/types/accommodation.types';

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
