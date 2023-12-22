import { useQuery } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { AccommodationRes } from '@/types/accommodation.types';

export const useGetAccommodations = () => {
  return useQuery({
    queryKey: ['accommodations'],
    queryFn: () => httpClient.get<AccommodationRes>(ENDPOINTS.accommodation.getAccommodations),
    // enabled: !!token,
  });
};
