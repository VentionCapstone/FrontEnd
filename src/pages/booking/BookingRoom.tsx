// BookingRoom.tsx
import React from 'react';
import BookingForm from '../../components/booking/BookingForm';
import { useGetAvailabeDates } from '../../api/queries/booking/useGetAvailableDates';
import httpClient from '../../api/httpClient';
import { EndpointsConfig } from '../../config/endpoints.config';

interface BookingRoomProps {
  accommodationId: string;
}

const BookingRoom: React.FC<BookingRoomProps> = () => {
  const handleReservationSubmit = async (reservationData: {
    startDate: string;
    endDate: string;
    accommodationId: string;
  }) => {
    console.log('Sending reservation data:', reservationData);
    const response = await httpClient.post(EndpointsConfig.Booking.book, reservationData);
    console.log(response);
  };

  const { data } = useGetAvailabeDates('01786e74-320c-47ad-8a84-100e7211cb4a');
  // console.log(data);

  return <BookingForm onSubmit={(e) => void handleReservationSubmit(e)} data={data} />;
};

export default BookingRoom;
