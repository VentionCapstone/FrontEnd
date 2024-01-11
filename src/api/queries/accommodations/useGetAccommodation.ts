import { useQuery } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { AccommodationType } from '@/types/accommodation.types';

export const useGetAccommodation = ({ id }: { id: string | undefined }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.accommodation, id],
    queryFn: async () => {
      const { data } = await httpClient.get<{
        message: string;
        data: AccommodationType;
      }>(ENDPOINTS.accommodation.getAccommodation(id));
      return data;
    },
    enabled: !!id,
  });
};
