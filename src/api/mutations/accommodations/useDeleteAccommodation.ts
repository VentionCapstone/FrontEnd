import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { ROUTES } from '@/config/routes.config';
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
        queryKey: [QUERY_KEYS.query.accommodation, accommodationId],
      });
      toast.success('Accommodation deleted successfully');
      navigate(ROUTES.accommodations.root);
    },
  });
  return { mutate, isPending };
};
