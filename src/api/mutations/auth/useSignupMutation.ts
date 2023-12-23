import { useMutation } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import toast from 'react-hot-toast';
import { AuthData } from '../../../types/auth.types';

const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (data: AuthData) => {
      const response = await httpClient.post<{ success: boolean; message: string }>(
        '/auth/signup',
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
