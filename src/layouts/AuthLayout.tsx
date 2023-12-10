import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import { Container } from '@mui/material';
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
