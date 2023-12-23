import { useMutation } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import toast from 'react-hot-toast';
import { AuthData, LoginResponse } from '../../../types/auth.types';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { setToken } from '../../../stores/slices/authSlice';

const useSignInMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation<LoginResponse, unknown, AuthData>({
    mutationFn: async (data: AuthData) => {
      const response = await httpClient.post<LoginResponse>('/auth/signin', data);
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('sub', data.id);
      dispatch(setToken(data.tokens.access_token));
      toast.success('Login successful');
    },
  });
};

export default useSignInMutation;
