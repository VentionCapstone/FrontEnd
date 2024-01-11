import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router-dom';

import { StickyFooter } from '@/components/footer/StickyFooter';
import MainNavigation from '@/components/navigation';

function MainLayout() {
  return (
    <Stack minHeight={'100svh'}>
      <MainNavigation maxWidth={'2xl'} />
      <Container maxWidth={'2xl'} disableGutters sx={{ p: 6, pb: { xs: 20, md: 17 }, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <StickyFooter maxWidth={'2xl'} />
    </Stack>
  );
}

export default MainLayout;
