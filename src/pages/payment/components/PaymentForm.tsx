import { Box } from '@mui/material';
import { CardElement } from '@stripe/react-stripe-js';
import { FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import usePostPaymentToStripeMutation from '@src/api/mutations/payment/usePostPaymentToStripeMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import { PaymentInfo } from '@src/types/i18n.types';

export function PaymentForm({ bookingId }: { bookingId: string }) {
  const { mutate, isPending } = usePostPaymentToStripeMutation(bookingId || '');
  const { t } = useTranslation();

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
      <ButtonPrimary loading={isPending}>{t(PaymentInfo.button_type_card)}</ButtonPrimary>
    </Box>
  );
}
