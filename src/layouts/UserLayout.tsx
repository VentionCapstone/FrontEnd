import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function UserLayout() {
  return (
    <>
      <MainNavigation maxWidth={'xl'} />
      <Container maxWidth={'xl'} disableGutters sx={{ padding: '1.5rem' }}>
        <Outlet />
      </Container>
    </>
  );
}

export default UserLayout;
