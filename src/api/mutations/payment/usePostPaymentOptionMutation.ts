import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { RoutesConfig } from '../../../config/routes.config';
import { ResponsePayment } from '../../../types/payment.types';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { LOCAL_STORAGE_KEYS } from '../../../config/local-storage.config';
import { removeFromLocalStorage, setValueToLocalStorage } from '../../../utils';

function usePostPaymentOptionMutation(bookingId: string, paymentOption: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await httpClient.post<string | ResponsePayment>(
        EndpointsConfig.Payment.Root,
        {
          bookingId,
          paymentOption,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      if (typeof data === 'string') {
        setValueToLocalStorage(LOCAL_STORAGE_KEYS.clientSecret, data);
      } else {
        removeFromLocalStorage(LOCAL_STORAGE_KEYS.clientSecret);
        toast.success(data.message);
        navigate(RoutesConfig.Root);
      }
    },
  });
}

export default usePostPaymentOptionMutation;
