import { Navigate } from 'react-router-dom';

function ProfileCreateRoute({ children }: { children: React.ReactNode }) {
  const isCreated = false;
  return !isCreated ? children : <Navigate to={'/account/edit'} />;
}

export default ProfileCreateRoute;
