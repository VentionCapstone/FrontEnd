import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/config/routes.config';
import { useAppSelector } from '@/hooks/redux-hooks';

function ProfileCreateRoute({ children }: { children: React.ReactNode }) {
  const profile = useAppSelector((state) => state.auth.user?.profile) === null;

  return profile ? children : <Navigate to={ROUTES.account.edit} />;
}

export default ProfileCreateRoute;
