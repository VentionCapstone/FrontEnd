import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import useVerifyEmailMutation from '@src/api/mutations/auth/useVerifyEmailMutation';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { VerifyEmails } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';

function VerifyEmail() {
  const { t } = useTranslation();
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
      <Typography variant="h4">{t(VerifyEmails.title)}</Typography>
    </Box>
  );
}

export default VerifyEmail;
