import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../httpClient';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { logout } from '../../../stores/slices/authSlice';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { RoutesConfig } from '../../../config/routes.config';
import { QUERY_KEYS } from '../../../config/react-query.config';

function useLogoutMutation() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.logout],
    mutationFn: async () => {
      await httpClient.post(EndpointsConfig.Auth.SignOut);
    },
    onSuccess: () => {
      dispatch(logout());
      queryClient.clear();
      navigate(RoutesConfig.Root);
    },
  });
}

export default useLogoutMutation;
