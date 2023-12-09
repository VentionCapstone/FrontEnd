import { Container } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  const queryClient = new QueryClient();

  return (
    <Container maxWidth="sm">
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </Container>
  );
}

export default AuthLayout;
