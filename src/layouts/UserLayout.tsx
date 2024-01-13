import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router-dom';

import { Footer } from '@src/components/footer/Footer';
import MainNavigation from '@src/components/navigation';

function UserLayout() {
  return (
    <Stack minHeight={'100svh'}>
      <MainNavigation maxWidth={'xl'} />
      <Container maxWidth={'xl'} disableGutters sx={{ p: 6, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Footer maxWidth={'xl'} />
    </Stack>
  );
}

export default UserLayout;
