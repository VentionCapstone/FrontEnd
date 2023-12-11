import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import MainNavigation from '../components/MainNavigation';

function MainLayout() {
  return (
    <>
      <MainNavigation maxWidth={'2xl'} />
      <Container maxWidth={'2xl'} disableGutters sx={{ padding: 6 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default MainLayout;
