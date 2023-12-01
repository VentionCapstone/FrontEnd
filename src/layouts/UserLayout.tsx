import { Outlet } from 'react-router-dom';

function UserLayout() {
  return (
    <div>
      <h1>User Layout</h1>
      <Outlet />
    </div>
  );
}

export default UserLayout;
