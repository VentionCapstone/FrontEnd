import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@src/config/routes.config';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { hasToken } from '@src/stores/slices/authSlice';

type locationstate = {
  from: string;
};

function UserRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAppSelector(hasToken);
  const location = useLocation();
  const from = (location.state as locationstate)?.from;
  const previousPath = from ?? ROUTES.root;

  return isLoggedIn ? <Navigate to={previousPath} /> : children;
}

export default UserRoute;
