import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import { RoutesConfig } from '../config/routes.config';

function ProfileCreateRoute({ children }: { children: React.ReactNode }) {
  const profile = useAppSelector((state) => state.auth.user?.profile) === null;

  return profile ? children : <Navigate to={RoutesConfig.Account.Edit} />;
}

export default ProfileCreateRoute;
