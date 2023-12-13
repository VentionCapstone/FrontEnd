import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../httpClient';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { logout } from '../../../stores/slices/authSlice';

function useLogoutMutation() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await httpClient.post('/auth/signout');
    },
    onSuccess: () => {
      dispatch(logout());
      queryClient.clear();
      navigate('/');
    },
  });
}

export default useLogoutMutation;
