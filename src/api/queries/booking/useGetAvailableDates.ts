import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../config/react-query.config';
import { EndpointsConfig } from '../../../config/endpoints.config';
import httpClient from '../../httpClient';

interface dataType {
  availableDates: string[][];
  accommodationId: string;
}

interface AvailableDatesResponse {
  data: dataType;
  status: boolean;
}

export const useGetAvailabeDates = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.availableDates],
    queryFn: async () => {
      const { data } = await httpClient.get<AvailableDatesResponse>(
        EndpointsConfig.Booking.GetAvailableDates(id)
      );
      return data.data;
    },
  });
};
