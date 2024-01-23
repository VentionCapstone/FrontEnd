import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useBookingRoom } from '@src/api/mutations/booking/useBookingRoom';
import { useGetAvailableDates } from '@src/api/queries/booking/useGetAvailableDates';
import { ROUTES } from '@src/config/routes.config';
import { DATE_FORMAT_MONTH_FIRST } from '@src/constants';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { styles } from '@src/pages/accomodation/Accommodation.styles';
import { hasToken } from '@src/stores/slices/authSlice';
import { BookingForms } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import ButtonPrimary from '../../components/button/ButtonPrimary';
import { ReservationData, createReservationData, selectDatesType, selectedDateType } from './time';

interface BookingFormProps {
  accomodationId: unknown;
  price: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ accomodationId, price }) => {
  const { t } = useTranslation();
  const isUserLoggedIn = useAppSelector(hasToken);
  const { mutate } = useBookingRoom();

  const { data, isPending, isError } = useGetAvailableDates(
    accomodationId as string,
    isUserLoggedIn
  );

  const [selectedDates, setSelectedDates] = useState<selectDatesType>([null, null]);
  const [startDate, endDate] = selectedDates;
  const { availableDates, accommodationId } = data || {};
  const [errorMessage, setErrorMessage] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [disablesCheckOutDate, setDisablesCheckOutDate] = useState(true);

  const disableCheckInDate = useCallback(
    (date: Dayjs) => {
      const dateString = date.format(DATE_FORMAT_MONTH_FIRST);

      return !availableDates?.some(([start, end]) => dateString >= start && dateString <= end);
    },
    [availableDates]
  );

  const disableCheckOutDate = useCallback(
    (date: Dayjs) => {
      const dateString = date.format(DATE_FORMAT_MONTH_FIRST);
      const startDate = selectedDates[0]?.format(DATE_FORMAT_MONTH_FIRST);

      if (startDate) {
        const array = availableDates?.find(
          ([start, end]) => start >= startDate || startDate <= end
        ) as string[];

        return dateString < array?.[0] || dateString > array?.[1];
      }

      return false;
    },
    [availableDates, selectedDates]
  );

  const handleDateChange = (index: number) => (newValue: selectedDateType) => {
    if (index === 0) {
      setDisablesCheckOutDate(false);
    }
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

        mutate(reservationData);
      }
    },
    [startDate, endDate, accommodationId, mutate]
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
        <Typography color={'secondary.main'}>{t(BookingForms.error_message)}</Typography>
      )}
      <Typography mb={7}>
        <b style={{ fontSize: '1.2em' }}>${price} </b> {t(BookingForms.night)}
      </Typography>

      {isUserLoggedIn ? (
        <>
          <form onSubmit={handleReserveButtonClick}>
            <Stack direction="row" spacing={4}>
              <DatePicker
                label={t(BookingForms.check_in)}
                value={selectedDates[0]}
                onChange={handleDateChange(0)}
                shouldDisableDate={disableCheckInDate}
              />
              <DatePicker
                label={t(BookingForms.check_out)}
                value={selectedDates[1]}
                disabled={disablesCheckOutDate}
                onChange={handleDateChange(1)}
                shouldDisableDate={disableCheckOutDate}
              />
            </Stack>

            <ButtonPrimary disabled={isPending || isError || errorMessage}>
              {t(BookingForms.reserve)}
            </ButtonPrimary>
          </form>
          <Typography variant="body2" m={3} textAlign={'center'}>
            {t(BookingForms.you_will_not_charged_yet)}
          </Typography>
          <Divider />
          {totalPrice && (
            <Typography sx={styles.content_price} variant="lg" my={4}>
              {t(BookingForms.total)} <b>${totalPrice}</b>
            </Typography>
          )}
        </>
      ) : (
        <Typography>
          <Link component={RouterLink} to={ROUTES.auth.signIn} fontWeight={600}>
            {t(BookingForms.login)}
          </Link>{' '}
          {t(BookingForms.login_req)}
        </Typography>
      )}
    </Box>
  );
};

export default BookingForm;
