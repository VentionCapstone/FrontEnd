import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { AllMediaResponse } from '@src/types/accommodation.types';
import { useQuery } from '@tanstack/react-query';

export function UseGetAllMediaQuery(id: string, enabled = false) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.media, id],
    queryFn: async () => {
      const data = await httpClient.get<AllMediaResponse>(
        ENDPOINTS.accommodation.getAccommodationMedia(id)
      );
      return data.data.data;
    },
    enabled,
  });
}
