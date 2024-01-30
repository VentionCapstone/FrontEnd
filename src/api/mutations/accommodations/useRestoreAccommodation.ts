import { useMutation, useQueryClient } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { ROUTES } from '@src/config/routes.config';
import { AccommodationType } from '@src/types/accommodation.types';
import { ToastMessages } from '@src/types/i18n.types';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const useRestoreAccommodation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => {
      return httpClient.patch<{
        message: string;
        data: AccommodationType;
      }>(ENDPOINTS.accommodation.restoreAccommodation(id));
    },

    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.accommodations] });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.hostedAccommodation, res.data?.data.id],
      });
      toast.success(t(ToastMessages.SuccessAccommodationRestored));
      navigate(ROUTES.accommodations.root);
    },
  });

  return { mutate, isPending };
};
