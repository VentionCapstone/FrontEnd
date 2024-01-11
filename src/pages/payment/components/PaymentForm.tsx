import { Box } from '@mui/material';
import { FormEvent, useCallback } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import ButtonPrimary from '../../../components/button/ButtonPrimary';
import usePostPaymentToStripeMutation from '../../../api/mutations/payment/usePostPaymentToStripeMutation';

export function PaymentForm({ bookingId }: { bookingId: string }) {
  const { mutate, isPending } = usePostPaymentToStripeMutation(bookingId || '');

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate();
    },
    [mutate]
  );

  return (
    <Box component={'form'} id="payment-form" onSubmit={handleSubmit} mt={'1rem'}>
      <CardElement id="card-element" />
      <ButtonPrimary loading={isPending}>Pay with card</ButtonPrimary>
    </Box>
  );
}
