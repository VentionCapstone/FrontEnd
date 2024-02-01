import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { STATUSES } from '@src/constants';
import { ResponsePayment } from '@src/types/payment.types';
import { removeFromLocalStorage, setValueToLocalStorage } from '@src/utils';

function usePostPaymentOptionMutation(bookingId: string, paymentOption: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await httpClient.post<string | ResponsePayment>(ENDPOINTS.payment.root, {
        bookingId,
        paymentOption,
      });
      return data;
    },
    onSuccess: async (data) => {
      if (typeof data === 'string') {
        setValueToLocalStorage(LOCAL_STORAGE_KEYS.clientSecret, data);
      } else {
        removeFromLocalStorage(LOCAL_STORAGE_KEYS.clientSecret);
        toast.success(data.message);
        navigate('/bookings?status=UPCOMING');
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.query.bookings, STATUSES.ACTIVE],
        });
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.query.bookings, STATUSES.UPCOMING],
        });
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.query.bookings, STATUSES.PENDING],
        });
      }
    },
  });
}

export default usePostPaymentOptionMutation;
