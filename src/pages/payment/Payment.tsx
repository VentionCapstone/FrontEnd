import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import usePostPaymentOptionMutation from '@src/api/mutations/payment/usePostPaymentOptionMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import DataFetchError from '@src/components/shared/DataFetchError';
import { stripePromise } from '@src/config/stripe.config';
import { PaymentForm } from './components/PaymentForm';
import { PAYMENT_OPTION } from './components/contants';

export type PaymentOption = (typeof PAYMENT_OPTION)[keyof typeof PAYMENT_OPTION];

const Payment = () => {
  const { id: bookingId = '' } = useParams();
  const [paymentOption, setPaymentOption] = useState<PaymentOption>(PAYMENT_OPTION.card);

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

  if (isError) {
    return <DataFetchError />;
  }

  return (
    <Box
      sx={{
        width: {
          sm: '80%',
          md: '50%',
          lg: '40%',
          xl: '30%',
        },
        marginX: 'auto',
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
  );
};
export default Payment;
