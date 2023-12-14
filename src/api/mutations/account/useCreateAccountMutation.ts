import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../httpClient';
import { Profile } from '../../../types/profile.types';
import toast from 'react-hot-toast';

function useCreateAccountMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['createAccount'],
    mutationFn: async (profileToSave: Profile) => {
      await httpClient.post('/users/profile', profileToSave);
    },
    onSuccess: () => {
      navigate('/account');
      toast.success('Profile created!');
    },
  });
}

export default useCreateAccountMutation;
