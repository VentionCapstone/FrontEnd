import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../../../config/endpoints.config';
import { QUERY_KEYS } from '../../../config/react-query.config';
import { AvailableDatesResponse } from '../../../types/booking.types';
import httpClient from '../../httpClient';

export const useGetAvailableDates = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.availableDates, id],
    queryFn: async () => {
      const { data } = await httpClient.get<AvailableDatesResponse>(
        ENDPOINTS.Booking.GetAvailableDates(id)
      );
      return data.data;
    },
  });
};
