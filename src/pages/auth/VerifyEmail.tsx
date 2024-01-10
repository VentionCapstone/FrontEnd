import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import useVerifyEmailMutation from '@/api/mutations/auth/useVerifyEmailMutation';
import LoadingPrimary from '@/components/loader/LoadingPrimary';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const { isPending, mutate } = useVerifyEmailMutation(token);

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
