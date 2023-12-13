import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import LoadingPrimary from '../../components/LoadingPrimary';
import useVerifyEmailMutation from '../../api/mutations/auth/useVerifyEmailMutation';

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
