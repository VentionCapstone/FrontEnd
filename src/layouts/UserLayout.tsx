import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function UserLayout() {
  return (
    <>
      <MainNavigation maxWidth={'xl'} />
      <Container maxWidth={'xl'} disableGutters sx={{ padding: 6 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default UserLayout;
