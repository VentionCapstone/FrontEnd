import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';
import { Elements } from '@stripe/react-stripe-js';
import dayjs from 'dayjs';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import usePostPaymentOptionMutation from '@src/api/mutations/payment/usePostPaymentOptionMutation';
import useGetSingleAccommodationQuery from '@src/api/queries/accommodation/useGetSingleAccommodationQuery';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import DataFetchError from '@src/components/shared/DataFetchError';
import { stripePromise } from '@src/config/stripe.config';
import { DATE_MONTH_DAY } from '@src/constants';
import { handleErrorInImage, truncateReview } from '@src/utils';
import { PaymentForm } from './components/PaymentForm';
import { PAYMENT_OPTION } from './components/contants';

export type PaymentOption = (typeof PAYMENT_OPTION)[keyof typeof PAYMENT_OPTION];

const Payment = () => {
  const { id: bookingId = '' } = useParams();
  const [paymentOption, setPaymentOption] = useState<PaymentOption>(PAYMENT_OPTION.card);
  const [searchParams] = useSearchParams();

  const accommodationId = searchParams.get('accommodationId') || '';
  const startDate = dayjs(searchParams.get('startDate'));
  const endDate = dayjs(searchParams.get('endDate'));

  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    data: accommodation,
    isPending: isAccommodationPending,
    isError: isAccommodationError,
  } = useGetSingleAccommodationQuery(accommodationId);

  const { mutate, isPending, isError } = usePostPaymentOptionMutation(
    bookingId || '',
    paymentOption
  );

  useEffect(() => {
    mutate();
  }, [mutate]);

  const handlePaymentChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedPaymentOption = e.target.value as PaymentOption;
    setPaymentOption(selectedPaymentOption);
  }, []);

  const handlePaymentClick = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate();
    },
    [mutate]
  );

  const calculateTotalPrice = useCallback(
    (price: number): number => {
      if (!startDate || !endDate) return 0;

      const nights = endDate.diff(startDate, 'days');
      const total = nights * price;
      return total;
    },
    [startDate, endDate]
  );

  const paymentMethods: Record<string, JSX.Element> = {
    [PAYMENT_OPTION.card]: (
      <Elements stripe={stripePromise}>
        <PaymentForm bookingId={bookingId} />
      </Elements>
    ),
    [PAYMENT_OPTION.cash]: (
      <Box component={'form'} onSubmit={handlePaymentClick}>
        <ButtonPrimary loading={isPending}>Pay with cash</ButtonPrimary>
      </Box>
    ),
  };

  if (isError || isAccommodationError) {
    return <DataFetchError />;
  }

  if (isAccommodationPending) {
    return <LoadingPrimary height="10vh" />;
  }

  return (
    <>
      <Typography variant="lg">Payment</Typography>
      <Stack
        sx={{
          flexDirection: { xs: 'column', lg: 'row' },
          width: { xs: '100%', sm: '90%', lg: '87%', xl: '80%' },
          gap: 6,
          marginX: 'auto',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'space-between' },
        }}
      >
        <Box
          sx={{
            flex: '0.5',
            width: {
              xs: '100%',
              md: '70%',
              lg: '100%',
            },
            border: '1px solid',
            borderColor: 'secondary2.light',
            borderRadius: '1rem',
            padding: '1rem',
          }}
        >
          <FormControl>
            <FormLabel>Payment Option</FormLabel>
            <RadioGroup row value={paymentOption} onChange={handlePaymentChange}>
              <FormControlLabel value={PAYMENT_OPTION.card} control={<Radio />} label="Card" />
              <FormControlLabel value={PAYMENT_OPTION.cash} control={<Radio />} label="Cash" />
            </RadioGroup>
          </FormControl>
          {isPending ? <LoadingPrimary height="10vh" /> : paymentMethods[paymentOption]}
        </Box>

        <Box
          sx={{
            flex: '0.5',
            border: '1px solid',
            borderColor: 'secondary2.light',
            borderRadius: '1rem',
            padding: '1rem',
            width: {
              xs: '100%',
              md: '70%',
              lg: '100%',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              columnGap: '1rem',
            }}
          >
            <Box
              sx={{
                'flex': {
                  xs: '0.5',
                  md: '0.45',
                },
                'maxWidth': '180px',
                'maxHeight': '170px',
                '& img': {
                  width: '100%',
                  height: {
                    xs: '90%',
                    sm: '100%',
                  },
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                },
              }}
            >
              <img
                src={accommodation.previewImgUrl}
                alt={accommodation.title}
                onError={handleErrorInImage}
              />
            </Box>
            <Stack
              justifyContent={'inherit'}
              sx={{
                flex: {
                  xs: '0.5',
                  md: '0.55',
                },
              }}
            >
              <Typography fontWeight={600}>{accommodation.title}</Typography>
              <Typography variant="sm">
                {truncateReview(accommodation.description, mobileScreen ? 30 : 100)}
              </Typography>
              <Typography variant="sm">
                Dates: {startDate.format(DATE_MONTH_DAY)} - {endDate.format(DATE_MONTH_DAY)}
              </Typography>
              <Typography variant="sm">Price per night: ${accommodation.price}</Typography>
            </Stack>
          </Box>
          <Typography marginTop={'1rem'}>
            Total price: ${calculateTotalPrice(+accommodation.price)}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};
export default Payment;
