import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { PAYMENT_OPTION } from './components/contants';
import { PaymentForm } from './components/PaymentForm';
import { stripePromise } from '../../config/stripe.config';
import ButtonPrimary from '../../components/button/ButtonPrimary';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import usePostPaymentOptionMutation from '../../api/mutations/payment/usePostPaymentOptionMutation';

const Payment = () => {
  const bookingId = useParams().id;
  const [paymentOption, setPaymentOption] = useState<string>(PAYMENT_OPTION.card);

  const { mutate, isPending } = usePostPaymentOptionMutation(bookingId || '', paymentOption);

  useEffect(() => {
    mutate();
  }, [mutate]);

  const handlePaymentChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPaymentOption((e.target as HTMLInputElement).value);
  }, []);

  const handlePaymentClick = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate();
    },
    [mutate]
  );

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
      {isPending ? (
        <LoadingPrimary height="10vh" />
      ) : paymentOption === PAYMENT_OPTION.card ? (
        <Elements stripe={stripePromise}>
          <PaymentForm bookingId={bookingId || ''} />
        </Elements>
      ) : (
        <Box component={'form'} onSubmit={handlePaymentClick}>
          <ButtonPrimary loading={isPending}>Pay with cash</ButtonPrimary>
        </Box>
      )}
    </Box>
  );
};
export default Payment;
