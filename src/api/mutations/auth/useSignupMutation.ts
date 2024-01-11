import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { AuthData } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (data: AuthData) => {
      const response = await httpClient.post<{ success: boolean; message: string }>(
        ENDPOINTS.auth.signUp,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
};

export default useSignupMutation;
