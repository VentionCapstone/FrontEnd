import { useQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { AccommodationRes } from '@src/types/accommodation.types';

export const useGetAccommodations = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.accommodations],
    queryFn: async () => {
      const response = await httpClient.get<AccommodationRes>(
        ENDPOINTS.accommodation.getUserAccommodations(id)
      );
      return response.data?.data || [];
    },
    enabled: !!id,
  });
};
