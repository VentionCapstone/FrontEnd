import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { ROUTES } from '@src/config/routes.config';
import { STATUSES } from '@src/constants';
import { ResponsePayment } from '@src/types/payment.types';
import { getValueFromLocalStorage, removeFromLocalStorage } from '@src/utils';

function usePostPaymentToStripeMutation(bookingId: string) {
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    onSuccess: async (data) => {
      removeFromLocalStorage(LOCAL_STORAGE_KEYS.clientSecret);
      navigate(ROUTES.bookings.root);
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.bookings, STATUSES.ACTIVE],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.bookings, STATUSES.PENDING],
      });
    },
  });

  return useMutation({
    mutationFn: async () => {
      if (!stripe || !elements) {
        throw new Error('Unvailable, try again later.');
      }

      const cardEl = elements.getElement(CardElement);

      if (!cardEl) {
        throw new Error('Unvailable, try again later.');
      }

      const clientSecret = getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.clientSecret) || '';

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEl,
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
