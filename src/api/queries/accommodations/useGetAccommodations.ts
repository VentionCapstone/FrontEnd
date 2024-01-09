import { useQuery } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { AccommodationRes } from '@/types/accommodation.types';

export const useGetAccommodations = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.accommodations],
    queryFn: () =>
      httpClient.get<AccommodationRes>(ENDPOINTS.accommodation.getUserAccommodations(id || '')),
    enabled: !!id,
  });
};
