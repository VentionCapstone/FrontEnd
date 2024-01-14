import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { ROUTES } from '@src/config/routes.config';
import { useAppDispatch } from '@src/hooks/redux-hooks';
import { logout } from '@src/stores/slices/authSlice';

function useUpdateEmailMutation(email: string) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await httpClient.put<{ success: boolean; message: string }>(
        ENDPOINTS.auth.updateEmail,
        { email }
      );
      toast.success(data.message);
    },
    onSuccess: () => {
      dispatch(logout());
      navigate(ROUTES.auth.signIn);
    },
  });
}

export default useUpdateEmailMutation;
