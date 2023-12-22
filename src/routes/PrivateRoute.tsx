import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/config/routes.config';
import { useAppSelector } from '@/hooks/redux-hooks';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAppSelector((state) => state.auth.token) !== null;

  return isLoggedIn ? children : <Navigate to={ROUTES.auth.signIn} />;
}

export default PrivateRoute;
