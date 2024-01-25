import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { ROUTES } from '@src/config/routes.config';
import { STATUSES } from '@src/constants';
import { BookResponse } from '@src/types/booking.types';

export const useBookingRoom = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reservationData: {
      startDate: string;
      endDate: string;
      accommodationId: string;
    }) => {
      const {
        data: { data },
      } = await httpClient.post<BookResponse>(ENDPOINTS.booking.book, reservationData);
      return data;
    },
    onSuccess: async (data) => {
      navigate(ROUTES.payment.root(data.id, data.accommodationId, data.startDate, data.endDate));
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.bookings, STATUSES.PENDING],
      });
    },
  });
};
