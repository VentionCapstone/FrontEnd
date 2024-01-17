import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
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
      const { data } = await httpClient.post<BookResponse>(ENDPOINTS.booking.book, reservationData);
      return data.data;
    },
    onSuccess: (data) => {
      toast.success('Reservation successful');
      navigate(
        ROUTES.payment.root(
          data.id,
          '03669826-0741-442f-81f0-7c1a5c5d710c',
          data.startDate,
          data.endDate
        )
      );
    },
  });
};
