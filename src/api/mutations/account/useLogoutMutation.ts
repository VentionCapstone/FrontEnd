import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { ROUTES } from '@/config/routes.config';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { logout } from '@/stores/slices/authSlice';

function useLogoutMutation() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.logout],
    mutationFn: async () => {
      await httpClient.post(ENDPOINTS.auth.signOut);
    },
    onSuccess: () => {
      dispatch(logout());
      queryClient.clear();
      navigate(ROUTES.root);
    },
  });
}

export default useLogoutMutation;
