// BookingRoom.tsx
import React from 'react';
import BookingForm from '../../components/booking/BookingForm';
import { useGetAvailableDates } from '../../api/queries/booking/useGetAvailableDates';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import DataFetchError from '../../components/shared/DataFetchError';
import toast from 'react-hot-toast';
import { useBookingRoom } from '../../api/mutations/booking/useBookingRoom';

interface BookingRoomProps {
  accommodationId: string;
}

const BookingRoom: React.FC<BookingRoomProps> = () => {
  const { mutateAsync } = useBookingRoom();

  const submitReservation = async (reservationData: {
    startDate: string;
    endDate: string;
    accommodationId: string;
  }): Promise<void> => {
    try {
      await mutateAsync(reservationData);
    } catch (error) {
      toast.error('Reservation failed');
    }
  };

  const { data, isPending, isError, error } = useGetAvailableDates(
    '0153d978-924d-4c8a-a1f1-5085a8c1c75e'
  );

  const disableReserve = isPending || isError;

  return (
    <>
      {isPending && <LoadingPrimary />}
      {error && <DataFetchError error={error.message} />}
      <BookingForm
        onSubmit={submitReservation}
        data={data}
        disabled={disableReserve || isPending}
      />
    </>
  );
};

export default BookingRoom;
