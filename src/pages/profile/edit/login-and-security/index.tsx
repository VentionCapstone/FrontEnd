import { Box, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';

import BackButton from '@src/components/button/BackButton';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { LoginAndSecurityInfo } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import EditablePanel from '../EditablePanel';
import { UpdateEmail } from './UpdateEmail';
import { UpdatePassword } from './UpdatePassword';

function LoginAndSecurity() {
  const { t } = useTranslation();
  const userEmail = useAppSelector((state) => state.auth.user?.email) ?? '';

  const emailRenderProps = useCallback(
    (data: () => void) => <UpdateEmail collapsePanel={data} userEmail={userEmail} />,
    [userEmail]
  );

  const passwordRenderProps = useCallback(
    (data: () => void) => <UpdatePassword collapsePanel={data} />,
    []
  );

  return (
    <>
      <Stack direction={'row'} gap={4} alignItems={'center'} mb={{ xs: 6, md: 8, lg: 10 }}>
        <BackButton />

        <Typography variant={'heading'}>{t(LoginAndSecurityInfo.login_title)}</Typography>
      </Stack>

      <Box maxWidth={'60rem'}>
        <EditablePanel
          panelHeading={t(LoginAndSecurityInfo.email)}
          initial={
            <Typography variant={'sm'} color={'secondary2.main'}>
              {userEmail}
            </Typography>
          }
          editable={emailRenderProps}
        />

        <EditablePanel
          panelHeading={t(LoginAndSecurityInfo.password_input)}
          initial={
            <Typography variant={'sm'} color={'secondary2.main'}>
              {t(LoginAndSecurityInfo.password_change_your_password)}
            </Typography>
          }
          editable={passwordRenderProps}
        />
      </Box>
    </>
  );
}

export default LoginAndSecurity;
