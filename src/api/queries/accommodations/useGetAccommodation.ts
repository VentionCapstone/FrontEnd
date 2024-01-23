import { useQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { AccommodationSingleResponse } from '@src/types/accommodation.types';

export const useGetAccommodation = ({ id }: { id: string | undefined }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.accommodation, id],
    queryFn: async () => {
      const { data } = await httpClient.get<AccommodationSingleResponse>(
        ENDPOINTS.accommodation.getAccommodation(id)
      );
      return data;
    },
    enabled: !!id,
  });
};
