import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { ROUTES } from '@/config/routes.config';
import { AccommodationReq, AccommodationType } from '@/types/accommodation.types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useUpdateAccommodation = () => {
  const navigate = useNavigate();
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
      toast.success('Accommodation updated successfully');
      navigate(ROUTES.accommodations.root);
    },
  });

  return { mutate };
};
