import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import { Container } from '@mui/material';

function MainLayout() {
  return (
    <>
      <MainNavigation maxWidth={'2xl'} />
      <Container maxWidth={'2xl'} disableGutters sx={{ padding: '1.5rem' }}>
        <Outlet />
      </Container>
    </>
  );
}

export default MainLayout;
