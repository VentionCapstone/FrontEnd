// // BookingForm.tsx
import { Box, Divider, Stack, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGetAvailableDates } from '@src/api/queries/booking/useGetAvailableDates';
import { styles } from '@src/pages/accomodation/Accommodation.styles';
import ButtonPrimary from '../../components/button/ButtonPrimary';
import {
  DateFormat,
  ReservationData,
  createReservationData,
  selectDatesType,
  selectedDateType,
} from './time';

interface BookingFormProps {
  onSubmit: (reservationData: {
    startDate: string;
    endDate: string;
    accommodationId: string;
  }) => void;
  accomodationId: unknown;
  price: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, accomodationId, price }) => {
  const { data, isPending, isError } = useGetAvailableDates(accomodationId as string);

  const [selectedDates, setSelectedDates] = useState<selectDatesType>([null, null]);
  const [startDate, endDate] = selectedDates;
  const { availableDates, accommodationId } = data || {};
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState<number>();

  const shouldDisableDate = (date: Dayjs) => {
    const dateString = date.format(DateFormat);
    // Disable dates that are not within the available range
    return !availableDates?.some(([start, end]) => dateString >= start && dateString <= end);
  };

  const handleDateChange = (index: number) => (newValue: selectedDateType) => {
    setSelectedDates((prevSelectedDates) => {
      const newSelectedDates = [...prevSelectedDates];
      newSelectedDates[index] = newValue;
      const [startDate, endDate] = newSelectedDates;
      if (
        (startDate && endDate && startDate?.isSame(endDate)) ||
        (startDate && endDate && startDate.isAfter(endDate))
      ) {
        setErrorMessage('Check-in date must be before the check-out date and must not be same');
      } else {
        setErrorMessage('');
      }

      return newSelectedDates as selectDatesType;
    });
  };

  const calculateTotalPrice = useCallback(() => {
    if (startDate && endDate) {
      const nights = endDate.diff(startDate, 'days');
      const total = nights * price;
      setTotalPrice(total);
    }
  }, [startDate, endDate, price]);

  useEffect(() => {
    if (!errorMessage) {
      calculateTotalPrice();
    }
  }, [calculateTotalPrice, startDate, endDate, errorMessage]);

  const handleReserveButtonClick = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (startDate && endDate && accommodationId) {
        const reservationData: ReservationData = createReservationData(
          startDate,
          endDate,
          accommodationId
        );

        try {
          onSubmit(reservationData);
        } catch (error) {
          setErrorMessage('There was an error submitting your reservation. Please try again.');
        }
      }
    },
    [startDate, endDate, accommodationId, onSubmit]
  );

  return (
    <Box
      sx={{
        m: '5% auto',
        maxWidth: '400px',
        borderRadius: 3,
        border: '1px solid #b0b0b0 ',
        p: '1.5em',
        boxShadow: 5,
      }}
    >
      {errorMessage && <Typography color={'red'}>{errorMessage}</Typography>}
      <Typography mb={7}>
        <b style={{ fontSize: '1.2em' }}>${price} </b> night
      </Typography>
      <form onSubmit={handleReserveButtonClick}>
        <Stack direction="row" spacing={4}>
          <DatePicker
            label="Check In"
            value={selectedDates[0]}
            onChange={handleDateChange(0)}
            shouldDisableDate={shouldDisableDate}
          />
          <DatePicker
            label="Check Out"
            value={selectedDates[1]}
            onChange={handleDateChange(1)}
            shouldDisableDate={shouldDisableDate}
          />
        </Stack>

        <ButtonPrimary disabled={isPending || isError}>Reserve</ButtonPrimary>
      </form>
      <Typography variant="body2" m={3} textAlign={'center'}>
        you won&apos;t charged yet
      </Typography>
      <Divider />
      {totalPrice && (
        <Typography sx={styles.content} variant="lg" my={4}>
          Total <b>${totalPrice}</b>
        </Typography>
      )}
    </Box>
  );
};

export default BookingForm;
