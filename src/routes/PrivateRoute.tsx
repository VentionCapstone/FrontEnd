import { Navigate } from 'react-router-dom';

import { ROUTES } from '@src/config/routes.config';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { hasToken } from '@src/stores/slices/authSlice';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAppSelector(hasToken);

  return isLoggedIn ? children : <Navigate to={ROUTES.auth.signIn} />;
}

export default PrivateRoute;
