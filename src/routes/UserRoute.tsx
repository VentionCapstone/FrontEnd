import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@src/hooks/redux-hooks';
import { hasToken } from '@src/stores/slices/authSlice';

function UserRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAppSelector(hasToken);

  return isLoggedIn ? <Navigate to="/account" /> : children;
}

export default UserRoute;
