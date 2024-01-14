import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ENDPOINTS } from '../../../config/endpoints.config';
import httpClient from '../../httpClient';

export const useBookingRoom = () => {
  return useMutation({
    mutationFn: (reservationData: {
      startDate: string;
      endDate: string;
      accommodationId: string;
    }) => httpClient.post(ENDPOINTS.Booking.book, reservationData),
    onSuccess: () => {
      toast.success('Reservation successful');
    },
  });
};
