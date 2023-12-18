import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../httpClient';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { logout } from '../../../stores/slices/authSlice';
import toast from 'react-hot-toast';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { RoutesConfig } from '../../../config/routes.config';

function useUpdateEmailMutation(email: string) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await httpClient.put<{ success: boolean; message: string }>(
        EndpointsConfig.Auth.UpdateEmail,
        {
          email,
        }
      );
      toast.success(data.message);
    },
    onSuccess: () => {
      dispatch(logout());
      navigate(RoutesConfig.Auth.SignIn);
    },
  });
}

export default useUpdateEmailMutation;
