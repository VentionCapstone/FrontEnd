import EditablePanel from '../EditablePanel';
import { Typography } from '@mui/material';
import { UpdateEmail } from './updateEmail';
import { UpdatePassword } from './UpdatePassword';

function LoginAndSecurity() {
  return (
    <>
      <Typography mb={6} fontSize={{ xs: '1.25rem', md: '2rem' }} fontWeight={600} component={'h1'}>
        Login & security
      </Typography>

      <EditablePanel
        panelHeading={'Email'}
        initial={
          <Typography variant={'sm'} color={'secondary2.main'}>
            user@mail.com
          </Typography>
        }
        editable={(data) => <UpdateEmail collapsePanel={data} />}
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
    </>
  );
}

export default LoginAndSecurity;
