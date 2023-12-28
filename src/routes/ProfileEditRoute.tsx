import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@/config/routes.config';
import { useAppSelector } from '@/hooks/redux-hooks';

function ProfileEditRoute() {
  const profile = useAppSelector((state) => state.auth?.user?.profile) !== null;

  return profile ? <Outlet /> : <Navigate to={ROUTES.account.create} />;
}

export default ProfileEditRoute;
