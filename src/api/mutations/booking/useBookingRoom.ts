import { useMutation } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { EndpointsConfig } from '../../../config/endpoints.config';
import toast from 'react-hot-toast';

export const useBookingRoom = () => {
  return useMutation({
    mutationFn: (reservationData: {
      startDate: string;
      endDate: string;
      accommodationId: string;
    }) => httpClient.post(EndpointsConfig.Booking.book, reservationData),
    onSuccess: () => {
      toast.success('Reservation successful');
    },
  });
};
