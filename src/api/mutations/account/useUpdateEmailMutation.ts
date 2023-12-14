import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../httpClient';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { logout } from '../../../stores/slices/authSlice';
import toast from 'react-hot-toast';

function useUpdateEmailMutation(email: string) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await httpClient.put<{ success: boolean; message: string }>('/auth/email', {
        email,
      });
      toast.success(data.message);
    },
    onSuccess: () => {
      dispatch(logout());
      navigate('/auth/signin');
    },
  });
}

export default useUpdateEmailMutation;
