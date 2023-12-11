import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import httpClient from '../../api/httpClient';
import LoadingPrimary from '../../components/LoadingPrimary';
import { Box, Typography } from '@mui/material';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ['verify-email'],
    mutationFn: async () => {
      await httpClient.post<string>('/auth/verify', { token });
    },
    onSuccess: () => {
      toast.success('Email verified');
      navigate('/auth/signin');
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isPending) {
    return <LoadingPrimary />;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
      }}
    >
      <Typography variant="h4">Verifying email...</Typography>
    </Box>
  );
}

export default VerifyEmail;
