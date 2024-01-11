import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { LOCAL_STORAGE_KEYS } from '@/config/local-storage.config';
import { ROUTES } from '@/config/routes.config';
import { ResponsePayment } from '@/types/payment.types';
import { removeFromLocalStorage, setValueToLocalStorage } from '@/utils';

function usePostPaymentOptionMutation(bookingId: string, paymentOption: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await httpClient.post<string | ResponsePayment>(ENDPOINTS.payment.root, {
        bookingId,
        paymentOption,
      });
      return data;
    },
    onSuccess: (data) => {
      if (typeof data === 'string') {
        setValueToLocalStorage(LOCAL_STORAGE_KEYS.clientSecret, data);
      } else {
        removeFromLocalStorage(LOCAL_STORAGE_KEYS.clientSecret);
        toast.success(data.message);
        navigate(ROUTES.root);
      }
    },
  });
}

export default usePostPaymentOptionMutation;
