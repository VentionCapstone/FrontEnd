import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import { StickyFooter } from '@src/components/footer/StickyFooter';
import MainNavigation from '@src/components/navigation';

function MainLayout() {
  return (
    <>
      <ScrollRestoration />
      <Stack minHeight={'100svh'}>
        <MainNavigation maxWidth={'xl'} />
        <Container
          maxWidth={'xl'}
          disableGutters
          sx={{ p: 6, pb: { xs: 20, md: 17 }, flexGrow: 1 }}
        >
          <Outlet />
        </Container>
        <StickyFooter maxWidth={'xl'} />
      </Stack>
    </>
  );
}

export default MainLayout;
