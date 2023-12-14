import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../httpClient';
import { Profile } from '../../../types/profile.types';
import toast from 'react-hot-toast';

function useCreateAccountMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createAccount'],
    mutationFn: async (profileToSave: Profile) => {
      await httpClient.post('/users/profile', profileToSave);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/account');
      toast.success('Profile created!');
    },
  });
}

export default useCreateAccountMutation;
