import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/config/routes.config';
import { useAppSelector } from '@/hooks/redux-hooks';
import { hasToken } from '@/stores/slices/authSlice';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAppSelector(hasToken);

  return isLoggedIn ? children : <Navigate to={ROUTES.auth.signIn} />;
}

export default PrivateRoute;
