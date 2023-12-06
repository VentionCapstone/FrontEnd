import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <Container maxWidth="sm">
      <Outlet />
    </Container>
  );
}

export default AuthLayout;
