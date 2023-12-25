import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { ROUTES } from '@/config/routes.config';
import { Profile } from '@/types/profile.types';

function useCreateAccountMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.createAccount],
    mutationFn: async (profileToSave: Profile) => {
      await httpClient.post(ENDPOINTS.account.createUserProfile, profileToSave);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.user] });
      navigate(ROUTES.account.root);
      toast.success('Profile created!');
    },
  });
}

export default useCreateAccountMutation;
