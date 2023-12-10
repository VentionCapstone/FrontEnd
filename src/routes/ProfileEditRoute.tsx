import { Navigate, Outlet } from 'react-router-dom';

function ProfileEditRoute() {
  const isCreated = false;
  return isCreated ? <Outlet /> : <Navigate to={'/account/create'} />;
}

export default ProfileEditRoute;
