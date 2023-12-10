import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAppSelector((state) => state.auth.token) !== null;
  return isLoggedIn ? children : <Navigate to="/auth/signin" />;
}

export default PrivateRoute;
