import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

function UserRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAppSelector((state) => state.auth.token) !== null;

  return isLoggedIn ? <Navigate to="/account" /> : children;
}

export default UserRoute;
