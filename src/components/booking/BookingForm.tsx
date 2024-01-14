// // BookingForm.tsx
import React, { useCallback, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { Dayjs } from 'dayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonPrimary from '../../components/button/ButtonPrimary';
import { DataType } from '../../types/booking.types';
import DataFetchError from '../shared/DataFetchError';
import { DateFormat, ReservationData, createReservationData, selectDatesType } from './time';

interface BookingFormProps {
  onSubmit: (reservationData: {
    startDate: string;
    endDate: string;
    accommodationId: string;
  }) => Promise<void>;
  data: DataType | undefined;
  disabled?: boolean | undefined;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, data, disabled }) => {
  const [selectedDates, setSelectedDates] = useState<selectDatesType>([null, null]);
  const [startDate, endDate] = selectedDates;
  const { availableDates, accommodationId } = data || {};

  const shouldDisableDate = (date: Dayjs) => {
    const dateString = date.format(DateFormat);
    return !availableDates?.some(([start, end]) => dateString >= start && dateString <= end);
  };

  const handleDateChange = (index: number) => (newValue: Dayjs | null) => {
    setSelectedDates((prevSelectedDates) => {
      const newSelectedDates = [...prevSelectedDates];
      newSelectedDates[index] = newValue;

      return newSelectedDates as selectDatesType;
    });
  };

  const handleReserveButtonClick = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
    },
    [startDate, endDate, accommodationId, onSubmit]
  );

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
        <ButtonPrimary disabled={disabled}>Reserve</ButtonPrimary>
      </form>
    </Box>
  );
};

export default BookingForm;
