import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@src/config/routes.config';
import { useAppSelector } from '@src/hooks/redux-hooks';

function ProfileEditRoute() {
  const profile = useAppSelector((state) => state.auth?.user?.profile) !== null;

  return profile ? <Outlet /> : <Navigate to={ROUTES.account.create} />;
}

export default ProfileEditRoute;
