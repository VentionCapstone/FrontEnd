import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { ROUTES } from '@src/config/routes.config';
import { useAppDispatch } from '@src/hooks/redux-hooks';
import { logout } from '@src/stores/slices/authSlice';

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
