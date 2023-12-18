import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import MainNavigation from '../components/navigation/MainNavigation';

function AuthLayout() {
  return (
    <>
      <MainNavigation maxWidth={'xl'} />
      <Container maxWidth={'xl'} disableGutters sx={{ padding: 6 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default AuthLayout;
