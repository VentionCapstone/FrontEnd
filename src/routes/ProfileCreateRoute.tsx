import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

function ProfileCreateRoute({ children }: { children: React.ReactNode }) {
  const profile = useAppSelector((state) => state.auth.user?.Profile) === null;

  return profile ? children : <Navigate to={'/account/edit'} />;
}

export default ProfileCreateRoute;
