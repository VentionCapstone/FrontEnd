import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { AvailableDatesResponse } from '@src/types/booking.types';
import { useQuery } from '@tanstack/react-query';

export const useGetAvailableDates = (id: string, isUserLoggedIn: boolean) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.availableDates, id],
    queryFn: async () => {
      const { data } = await httpClient.get<AvailableDatesResponse>(
        ENDPOINTS.booking.getAvailableDates(id)
      );
      return data.data;
    },
    enabled: isUserLoggedIn,
  });
};
