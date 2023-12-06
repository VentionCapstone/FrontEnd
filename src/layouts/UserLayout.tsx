import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

function UserLayout() {
  return (
    <div>
      <h1>User Layout</h1>
      <Container maxWidth={'xl'} disableGutters sx={{ padding: '1.5rem' }}>
        <Outlet />
      </Container>
    </div>
  );
}

export default UserLayout;
