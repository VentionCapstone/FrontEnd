import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { StickyFooter } from '../components/footer/StickyFooter';
import MainNavigation from '../components/navigation';

function MainLayout() {
  return (
    <>
      <MainNavigation maxWidth={'2xl'} />
      <Container maxWidth={'2xl'} disableGutters sx={{ p: 6, pb: { xs: 20, md: 6 } }}>
        <Outlet />
      </Container>
      <StickyFooter maxWidth={'2xl'} />
    </>
  );
}

export default MainLayout;
