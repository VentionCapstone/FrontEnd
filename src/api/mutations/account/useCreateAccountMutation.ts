import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../httpClient';
import { Profile } from '../../../types/profile.types';

function useCreateAccountMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['createAccount'],
    mutationFn: async (profileToSave: Profile) => {
      await httpClient.post('/users/profile', profileToSave);
    },
    onSuccess: () => {
      navigate('/');
    },
  });
}

export default useCreateAccountMutation;
