import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { RoutesConfig } from '../config/routes.config';
import { hasToken } from '../stores/slices/authSlice';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAppSelector(hasToken);

  return isLoggedIn ? children : <Navigate to={RoutesConfig.Auth.SignIn} />;
}

export default PrivateRoute;
