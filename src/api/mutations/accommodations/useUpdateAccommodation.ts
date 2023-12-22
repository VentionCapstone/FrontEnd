import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { AccommodationReq, AccommodationType } from '@/types/accommodation.types';

export const useUpdateAccommodation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: AccommodationReq & { id: string }) => {
      return httpClient.put<{
        message: string;
        data: AccommodationType;
      }>(ENDPOINTS.accommodation.updateAccommodation(data.id), data);
    },

    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.accommodations] });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.accommodation, res.data?.data.id],
      });
    },
  });

  return { mutate };
};
