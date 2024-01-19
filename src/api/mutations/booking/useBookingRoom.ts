import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { ROUTES } from '@src/config/routes.config';
import { BookResponse } from '@src/types/booking.types';

export const useBookingRoom = () => {
  const navigate = useNavigate();

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
    onSuccess: (data) => {
      navigate(ROUTES.payment.root(data.id, data.accommodationId, data.startDate, data.endDate));
    },
  });
};
