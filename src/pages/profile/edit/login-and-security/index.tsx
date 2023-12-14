import EditablePanel from '../EditablePanel';
import { Box, Typography } from '@mui/material';
import { UpdateEmail } from './UpdateEmail';
import { UpdatePassword } from './UpdatePassword';
import { useAppSelector } from '../../../../hooks/redux-hooks';

function LoginAndSecurity() {
  const userEmail = useAppSelector((state) => state.auth.user?.email) ?? '';

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
          editable={(data) => <UpdateEmail collapsePanel={data} userEmail={userEmail} />}
        />

        <EditablePanel
          panelHeading={'Password'}
          initial={
            <Typography variant={'sm'} color={'secondary2.main'}>
              Change you password
            </Typography>
          }
          editable={(data) => <UpdatePassword collapsePanel={data} />}
        />
      </Box>
    </>
  );
}

export default LoginAndSecurity;
