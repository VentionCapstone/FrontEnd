// // BookingForm.tsx
import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonPrimary from '../../components/button/ButtonPrimary';
import { BookingFormProps } from '../../types/booking.types';
import DataFetchError from '../shared/DataFetchError';
import { ReservationData, createReservationData } from './time';

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, data, disabled }) => {
  const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [startDate, endDate] = selectedDates;
  const { availableDates, accommodationId } = data || {};

  const shouldDisableDate = (date: Dayjs) => {
    const dateString = date.format('YYYY-MM-DD');
    return !availableDates?.some(([start, end]) => dateString >= start && dateString <= end);
  };

  const handleDateChange = (index: number) => (newValue: Dayjs | null) => {
    setSelectedDates((prevSelectedDates) => {
      const newSelectedDates = [...prevSelectedDates];
      newSelectedDates[index] = newValue;
      return newSelectedDates as [Dayjs | null, Dayjs | null];
    });
  };

  const handleReserveButtonClick = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (startDate && endDate && accommodationId) {
      const reservationData: ReservationData = createReservationData(
        startDate,
        endDate,
        accommodationId
      );

      try {
        await onSubmit(reservationData);
      } catch (error) {
        <DataFetchError />;
      }
    }
  };

  return (
    <Box
      sx={{
        m: '10% auto',
        maxWidth: '450px',
        borderRadius: 3,
        border: '1px solid #b0b0b0 ',
        p: '2%',
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleReserveButtonClick}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>
        <ButtonPrimary disabled={disabled}>Reserve</ButtonPrimary>
      </form>
    </Box>
  );
};

export default BookingForm;
