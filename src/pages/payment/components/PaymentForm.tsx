import { Box } from '@mui/material';
import { CardElement } from '@stripe/react-stripe-js';
import { FormEvent, useCallback } from 'react';

import usePostPaymentToStripeMutation from '@src/api/mutations/payment/usePostPaymentToStripeMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';

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
