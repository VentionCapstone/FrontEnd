import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

function ProfileCreateRoute({ children }: { children: React.ReactNode }) {
  const profile = useAppSelector((state) => state.auth.user?.profile);
  return profile ? <Navigate to={'/account/edit'} /> : children;
}

export default ProfileCreateRoute;
