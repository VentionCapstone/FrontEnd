import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { RoutesConfig } from '../config/routes.config';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAppSelector((state) => state.auth.token) !== null;

  return isLoggedIn ? children : <Navigate to={RoutesConfig.Auth.SignIn} />;
}

export default PrivateRoute;
