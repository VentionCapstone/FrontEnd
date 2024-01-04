// BookingRoom.tsx
import React, { useState } from 'react';
import BookingForm from '../../components/booking/BookingForm';
import { useGetAvailabeDates } from '../../api/queries/booking/useGetAvailableDates';
import httpClient from '../../api/httpClient';
import { EndpointsConfig } from '../../config/endpoints.config';
import { BookingRoomProps } from '../../types/booking.types';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import DataFetchError from '../../components/shared/DataFetchError';
import toast from 'react-hot-toast';

const BookingRoom: React.FC<BookingRoomProps> = () => {
  const [loading, setLoading] = useState(false);

  const submitReservation = async (reservationData: {
    startDate: string;
    endDate: string;
    accommodationId: string;
  }): Promise<void> => {
    try {
      setLoading(true);

      const response = await httpClient.post(EndpointsConfig.Booking.book, reservationData);

      if (response.status === 201) {
        toast.success('Reservation successful');
      }
    } finally {
      setLoading(false);
    }
  };
  // ------------------- change accomodationId
  const { data, isPending, isError, error } = useGetAvailabeDates(
    '01e8aa97-1b83-46ea-870f-32cbd2662525'
  );

  const disableReserve = isPending || isError;

  return (
    <>
      {isPending && <LoadingPrimary />}
      {error && <DataFetchError error={error.message} />}
      <BookingForm onSubmit={submitReservation} data={data} disabled={disableReserve || loading} />
    </>
  );
};

export default BookingRoom;
