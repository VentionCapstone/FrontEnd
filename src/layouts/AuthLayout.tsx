import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import MainNavigation from '../components/navigation';

function AuthLayout() {
  return (
    <>
      <MainNavigation maxWidth={'xl'} />
      <Container maxWidth={'xl'} disableGutters sx={{ p: 6, pb: { xs: 20, md: 6 } }}>
        <Outlet />
      </Container>
    </>
  );
}

export default AuthLayout;
