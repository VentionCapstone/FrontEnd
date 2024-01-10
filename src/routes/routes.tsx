import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import PrivateRoute from './PrivateRoute';
import UserRoute from './UserRoute';
import ProfileCreateRoute from './ProfileCreateRoute';
import ProfileEditRoute from './ProfileEditRoute';
import CreateProfile from '../pages/profile/create';
import EditProfile from '../pages/profile/edit';
import PersonalInfo from '../pages/profile/edit/personal-info';
import LoginAndSecurity from '../pages/profile/edit/login-and-security';
import ProfileSetting from '../pages/profile/edit/profile-settings';
import Signup from '../pages/signup/Signup';

const MainLayout = React.lazy(() => import('../layouts/MainLayout'));
const UserLayout = React.lazy(() => import('../layouts/UserLayout'));
const Main = React.lazy(() => import('../pages/main'));
const SignIn = React.lazy(() => import('../pages/signin'));
const VerifyEmail = React.lazy(() => import('../pages/auth/VerifyEmail'));
const Accommodation = React.lazy(() => import('../pages/accomodation/Accommodation'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Main /> },
      { path: 'rooms/:id', element: <Accommodation /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },

  {
    path: '/account',
    element: (
      <PrivateRoute>
        <UserLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to={'edit'} /> },
      {
        path: 'create',
        element: (
          <ProfileCreateRoute>
            <CreateProfile />
          </ProfileCreateRoute>
        ),
      },
      {
        path: 'edit',
        element: <ProfileEditRoute />,
        children: [
          { index: true, element: <EditProfile /> },
          { path: 'personal-info', element: <PersonalInfo /> },
          { path: 'login-and-security', element: <LoginAndSecurity /> },
          { path: 'settings', element: <ProfileSetting /> },
        ],
      },
      { path: '*', element: <Navigate to="/account" /> },
    ],
  },

  {
    path: '/auth',
    element: (
      <UserRoute>
        <UserLayout />
      </UserRoute>
    ),
    children: [
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <Signup /> },
      { path: 'verify', element: <VerifyEmail /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={routes} />;
}
