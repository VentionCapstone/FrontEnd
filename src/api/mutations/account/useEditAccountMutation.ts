import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { User } from '../../../types/user.types';
import { Profile } from '../../../types/profile.types';
import toast from 'react-hot-toast';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { QUERY_KEYS } from '../../../config/react-query.config';

function useEditAccountMutation(userId: User['id'] | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.editAccount],
    mutationFn: async (propertyToChange: Partial<Profile>) => {
      if (typeof userId !== 'string') throw new Error('userId must be a string!');

      await httpClient.patch(EndpointsConfig.Account.UpdateUserProfile(userId), propertyToChange);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.user] });
      toast.success('Updated successfully!');
    },
  });
}

export default useEditAccountMutation;
