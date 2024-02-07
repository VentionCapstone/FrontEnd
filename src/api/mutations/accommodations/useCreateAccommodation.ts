import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import {
  AccommodationReq,
  AccommodationSearchParamsType,
  AccommodationSingleResponse,
} from '@src/types/accommodation.types';
import { AccommodationSteps } from '@src/types/global.types';

export const useCreateAccommodation = ({
  handleSearchParamsChange,
}: AccommodationSearchParamsType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: AccommodationReq) => {
      const {
        data: { data },
      } = await httpClient.post<AccommodationSingleResponse>(ENDPOINTS.accommodation.root, {
        ...values,
        timezoneOffset: new Date().getTimezoneOffset(),
      });
      return data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.accommodations] });
      const newParams = new URLSearchParams({
        currentStep: AccommodationSteps.media.toString(),
        accommodationId: data.id,
      });
      handleSearchParamsChange(newParams);
    },
  });
};
