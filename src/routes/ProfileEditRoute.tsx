import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

function ProfileEditRoute() {
  const profile = useAppSelector((state) => state.auth.user?.profile);
  return profile ? <Outlet /> : <Navigate to={'/account/create'} />;
}

export default ProfileEditRoute;
