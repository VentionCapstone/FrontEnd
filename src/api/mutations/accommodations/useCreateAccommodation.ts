import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { AccommodationReq } from '@/types/accommodation.types';

export const useCreateAccommodation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: AccommodationReq) => {
      await httpClient.post(ENDPOINTS.accommodation.createAccommodation, data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.accommodations] });
    },
  });

  return { mutate };
};
