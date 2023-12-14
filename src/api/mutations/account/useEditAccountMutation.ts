import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { Profile, User } from '../../../types/profile.types';
import toast from 'react-hot-toast';

function useEditAccountMutation(userId: User['id']) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['editAccount'],
    mutationFn: async (propertyToChange: Partial<Profile>) => {
      await httpClient.patch('/users/profile/' + userId, propertyToChange);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Updated successfully!');
    },
  });
}

export default useEditAccountMutation;
