import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import httpClient from '../../httpClient';
import { RoutesConfig } from '../../../config/routes.config';
import { ResponsePayment } from '../../../types/payment.types';
import { EndpointsConfig } from '../../../config/endpoints.config';

function usePostPaymentToStripeMutation(bookingId: string) {
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  const { mutate: mutatePaymentConfirm } = useMutation({
    mutationFn: async (status: string) => {
      const { data } = await httpClient.post<ResponsePayment>(
        EndpointsConfig.Payment.PostConfirmPayment,
        {
          bookingId,
          status,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      localStorage.removeItem('clientSecret');
      toast.success(data.message);
      navigate(RoutesConfig.Root);
    },
  });

  return useMutation({
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
}

export default usePostPaymentToStripeMutation;
