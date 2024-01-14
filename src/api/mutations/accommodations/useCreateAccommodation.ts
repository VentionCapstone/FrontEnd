import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { ROUTES } from '@src/config/routes.config';
import { AccommodationReq } from '@src/types/accommodation.types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useCreateAccommodation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: AccommodationReq) => {
      await httpClient.post(ENDPOINTS.accommodation.root, data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.accommodations] });
      toast.success('Accommodation created successfully');
      navigate(ROUTES.accommodations.root);
    },
  });

  return { mutate };
};
