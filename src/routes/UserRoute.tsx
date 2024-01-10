import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { hasToken } from '../stores/slices/authSlice';

function UserRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAppSelector(hasToken);

  return isLoggedIn ? <Navigate to="/account" /> : children;
}

export default UserRoute;
