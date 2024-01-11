import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import httpClient from '../../httpClient';
import { RoutesConfig } from '../../../config/routes.config';
import { ResponsePayment } from '../../../types/payment.types';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { LOCAL_STORAGE_KEYS } from '../../../config/local-storage.config';
import { getValueFromLocalStorage, removeFromLocalStorage } from '../../../utils';

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
      removeFromLocalStorage(LOCAL_STORAGE_KEYS.clientSecret);
      toast.success(data.message);
      navigate(RoutesConfig.Root);
    },
  });

  return useMutation({
    mutationFn: async () => {
      if (!stripe || !elements) {
        toast.error('Unvailable, try again later.');
        return;
      }

      const cardEl = elements.getElement(CardElement);

      const clientSecret = getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.clientSecret) || '';

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl!,
        },
      });

      if (paymentIntent) {
        mutatePaymentConfirm(paymentIntent.status);
      } else if (error.type === 'card_error' || error.type === 'validation_error') {
        error.message && toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    },
  });
}

export default usePostPaymentToStripeMutation;
