// BookingForm.tsx
import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonPrimary from '../../components/button/ButtonPrimary';

interface dataType {
  availableDates: string[][];
  accommodationId: string;
}

interface BookingFormProps {
  onSubmit: (reservationData: {
    startDate: string;
    endDate: string;
    accommodationId: string;
  }) => void;
  data: dataType | undefined;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, data }) => {
  const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  const { availableDates, accommodationId } = data || {};

  const shouldDisableDate = (date: Dayjs) => {
    const dateString = date.format('YYYY-MM-DD');
    return !availableDates?.some((range) => dateString >= range[0] && dateString <= range[1]);
  };

  const handleDateChange = (index: number) => (newValue: Dayjs | null) => {
    setSelectedDates((prevSelectedDates) => {
      const newSelectedDates = [...prevSelectedDates];
      newSelectedDates[index] = newValue;
      return newSelectedDates as [Dayjs | null, Dayjs | null];
    });
  };

  const handleReserveButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedDates[0] && selectedDates[1]) {
      const reservationData = {
        startDate: selectedDates[0]?.format('YYYY-MM-DD') || '',
        endDate: selectedDates[1]?.format('YYYY-MM-DD') || '',
        accommodationId: accommodationId || '',
      };

      onSubmit(reservationData);
    } else {
      console.error('Please select both check-in and check-out dates');
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
      <form onSubmit={handleReserveButtonClick}>
        <Stack direction="row" spacing={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          </LocalizationProvider>
        </Stack>
        <ButtonPrimary disabled={!selectedDates[0] || !selectedDates[1]}>Reserve</ButtonPrimary>
      </form>
    </Box>
  );
};

export default BookingForm;
