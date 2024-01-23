import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { ROUTES } from '@src/config/routes.config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useDeleteAccommodation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => {
      return httpClient.delete(ENDPOINTS.accommodation.deleteAccommodation(id));
    },

    onSuccess: async (_, accommodationId) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.accommodations] });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.hostedAccommodation, accommodationId],
      });
      toast.success('Accommodation deleted successfully');
      navigate(ROUTES.accommodations.root);
    },
  });
  return { mutate, isPending };
};
