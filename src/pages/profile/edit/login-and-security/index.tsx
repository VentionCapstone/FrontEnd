import { Box, Typography } from '@mui/material';
import { useCallback } from 'react';

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
      <Typography
        mb={{ xs: 4, md: 6, lg: 10 }}
        fontSize={{ xs: '1.5rem', md: '2rem' }}
        fontWeight={600}
        component={'h1'}
      >
        {t(LoginAndSecurityInfo.login_title)}
      </Typography>

      <Box maxWidth={'60rem'}>
        <EditablePanel
          panelHeading={'Email'}
          initial={
            <Typography variant={'sm'} color={'secondary2.main'}>
              {userEmail}
            </Typography>
          }
          editable={emailRenderProps}
        />

        <EditablePanel
          panelHeading={t(LoginAndSecurityInfo.password)}
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
