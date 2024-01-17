import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGetAvailableDates } from '@src/api/queries/booking/useGetAvailableDates';
import { ROUTES } from '@src/config/routes.config';
import { DATE_FORMAT_MONTH_FIRST } from '@src/constants';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { styles } from '@src/pages/accomodation/Accommodation.styles';
import { hasToken } from '@src/stores/slices/authSlice';
import ButtonPrimary from '../../components/button/ButtonPrimary';
import { ReservationData, createReservationData, selectDatesType, selectedDateType } from './time';

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
  const isUserLoggedIn = useAppSelector(hasToken);

  const { data, isPending, isError } = useGetAvailableDates(
    accomodationId as string,
    isUserLoggedIn
  );

  const [selectedDates, setSelectedDates] = useState<selectDatesType>([null, null]);
  const [startDate, endDate] = selectedDates;
  const { availableDates, accommodationId } = data || {};
  const [errorMessage, setErrorMessage] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>();

  const shouldDisableDate = (date: Dayjs) => {
    const dateString = date.format(DATE_FORMAT_MONTH_FIRST);

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
        setErrorMessage(true);
      } else {
        setErrorMessage(false);
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

        onSubmit(reservationData);
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
        p: {
          xs: '1em',
          md: '1.5em',
        },
        boxShadow: 5,
      }}
    >
      {errorMessage && (
        <Typography color={'red'}>
          Check-in date must be before the check-out date and must not be same
        </Typography>
      )}
      <Typography mb={7}>
        <b style={{ fontSize: '1.2em' }}>${price} </b> night
      </Typography>

      {isUserLoggedIn ? (
        <>
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

            <ButtonPrimary disabled={isPending || isError || errorMessage}>Reserve</ButtonPrimary>
          </form>
          <Typography variant="body2" m={3} textAlign={'center'}>
            you won&apos;t charged yet
          </Typography>
          <Divider />
          {totalPrice && (
            <Typography sx={styles.content_price} variant="lg" my={4}>
              Total <b>${totalPrice}</b>
            </Typography>
          )}
        </>
      ) : (
        <Typography>
          <Link component={RouterLink} to={ROUTES.auth.signIn} fontWeight={600}>
            Login
          </Link>{' '}
          is required to make a reservation
        </Typography>
      )}
    </Box>
  );
};

export default BookingForm;
