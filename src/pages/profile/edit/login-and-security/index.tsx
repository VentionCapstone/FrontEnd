import EditablePanel from '../EditablePanel';
import { Box, Typography } from '@mui/material';
import { UpdateEmail } from './UpdateEmail';
import { UpdatePassword } from './UpdatePassword';
import { useAppSelector } from '../../../../hooks/redux-hooks';
import { useCallback } from 'react';

function LoginAndSecurity() {
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
        Login & security
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
          panelHeading={'Password'}
          initial={
            <Typography variant={'sm'} color={'secondary2.main'}>
              Change you password
            </Typography>
          }
          editable={passwordRenderProps}
        />
      </Box>
    </>
  );
}

export default LoginAndSecurity;
