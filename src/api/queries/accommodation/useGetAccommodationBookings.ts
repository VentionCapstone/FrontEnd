import { useQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { AccommodationBookingsResponse } from '@src/types/accommodation.types';

export const useGetAccommodationReservations = (
  id: string,
  options?: { currentMonth?: string; nextMonth?: string; orderByStartDate?: string }
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.accomodationReservations, id],
    queryFn: async () => {
      const { data } = await httpClient.get<AccommodationBookingsResponse>(
        ENDPOINTS.accommodation.getAccommodationBookings(id),
        {
          params: options,
        }
      );
      return data;
    },
    enabled: !!id,
  });
};
