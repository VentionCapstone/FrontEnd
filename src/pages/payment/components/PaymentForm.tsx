import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import httpClient from '../../../api/httpClient';
import { ResponsePayment } from '../../../types/payment.types';
import { Box } from '@mui/material';
import ButtonPrimary from '../../../components/button/ButtonPrimary';

export function PaymentForm({ bookingId }: { bookingId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!stripe || !elements) return;

      const cardEl = elements.getElement(CardElement);

      const clientSecret = localStorage.getItem('clientSecret') || '';

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl!,
        },
      });

      if (paymentIntent) {
        mutatePaymentConfirm(paymentIntent.status);
      }
    },
  });

  const { mutate: mutatePaymentConfirm } = useMutation({
    mutationFn: async (status: string) => {
      const { data } = await httpClient.post<ResponsePayment>('/payment/confirm', {
        bookingId,
        status,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.removeItem('clientSecret');
      navigate('/');
    },
  });

  // Custom styling for the CardElement
  const cardElementOptions = {
    style: {
      base: {
        'fontSize': '16px',
        'fontFamily': 'Arial, sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <Box component={'form'} id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="payment-element" options={cardElementOptions} />
      <ButtonPrimary loading={isPending}>Pay with card</ButtonPrimary>
    </Box>
  );
}
