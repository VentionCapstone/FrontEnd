import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { ROUTES } from '@src/config/routes.config';
import { ResponsePayment } from '@src/types/payment.types';
import { getValueFromLocalStorage, removeFromLocalStorage } from '@src/utils';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function usePostPaymentToStripeMutation(bookingId: string) {
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  const { mutate: mutatePaymentConfirm } = useMutation({
    mutationFn: async (status: string) => {
      const { data } = await httpClient.post<ResponsePayment>(
        ENDPOINTS.payment.postConfirmPayment,
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
      navigate(ROUTES.root);
    },
  });

  return useMutation({
    mutationFn: async () => {
      if (!stripe || !elements) {
        throw new Error('Unvailable, try again later.');
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
        throw new Error(error.message);
      } else {
        throw new Error('An unexpected error occurred.');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default usePostPaymentToStripeMutation;
