import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';

export const useDeleteAccommodation = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => {
      return httpClient.delete(ENDPOINTS.accommodation.deleteAccommodation(id));
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.accommodations] });
    },
  });

  return { mutate };
};
