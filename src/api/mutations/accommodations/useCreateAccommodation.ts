import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { AccommodationReq, AccommodationStepType } from '@src/types/accommodation.types';

export const useCreateAccommodation = ({ setCurrentStep }: AccommodationStepType) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: AccommodationReq) => {
      await httpClient.post(ENDPOINTS.accommodation.root, {
        ...data,
        timezoneOffset: new Date().getTimezoneOffset(),
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.accommodations] });
      setCurrentStep(2);
    },
  });

  return { mutate };
};
