import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { RoutesConfig } from '../config/routes.config';

function ProfileEditRoute() {
  const profile = useAppSelector((state) => state.auth?.user?.profile) !== null;

  return profile ? <Outlet /> : <Navigate to={RoutesConfig.Account.Create} />;
}

export default ProfileEditRoute;
