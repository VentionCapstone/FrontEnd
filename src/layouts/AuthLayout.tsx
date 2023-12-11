import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import MainNavigation from '../components/MainNavigation';

function AuthLayout() {
  return (
    <>
      <MainNavigation maxWidth={'xl'} />
      <Container maxWidth={'xl'} disableGutters sx={{ padding: '1.5rem' }}>
        <Outlet />
      </Container>
    </>
  );
}

export default AuthLayout;
