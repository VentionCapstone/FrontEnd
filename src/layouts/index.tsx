import { Container } from '@mui/material';
import MainNavigation from '@src/components/navigation';
import { Outlet } from 'react-router-dom';

type Props = {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

export default function Layout({ maxWidth = '2xl' }: Props) {
  return (
    <>
      <MainNavigation maxWidth={maxWidth} />
      <Container maxWidth={maxWidth} disableGutters sx={{ padding: 6 }}>
        <Outlet />
      </Container>
    </>
  );
}
