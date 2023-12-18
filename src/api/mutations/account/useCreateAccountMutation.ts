import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../httpClient';
import { Profile } from '../../../types/profile.types';
import toast from 'react-hot-toast';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { RoutesConfig } from '../../../config/routes.config';
import { QUERY_KEYS } from '../../../config/react-query.config';

function useCreateAccountMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.createAccount],
    mutationFn: async (profileToSave: Profile) => {
      await httpClient.post(EndpointsConfig.Account.CreateUserProfile, profileToSave);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.user] });
      navigate(RoutesConfig.Account.Root);
      toast.success('Profile created!');
    },
  });
}

export default useCreateAccountMutation;
