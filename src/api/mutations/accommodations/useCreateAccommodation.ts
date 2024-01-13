import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { AccommodationReq } from '@src/types/accommodation.types';

export const useCreateAccommodation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: AccommodationReq) => {
      await httpClient.post(ENDPOINTS.accommodation.root, data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.accommodations] });
    },
  });

  return { mutate };
};
