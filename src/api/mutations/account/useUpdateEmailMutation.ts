import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { ROUTES } from '@src/config/routes.config';
import { useAppDispatch } from '@src/hooks/redux-hooks';
import { logout } from '@src/stores/slices/authSlice';
import { CommonResponse } from '@src/types/auth.types';

function useUpdateEmailMutation(email: string) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await httpClient.put<CommonResponse>(ENDPOINTS.auth.updateEmail, { email });
      return data;
    },
    onSuccess: (data) => {
      dispatch(logout());
      toast.success(data.message);
      navigate(ROUTES.auth.signIn);
    },
  });
}

export default useUpdateEmailMutation;
