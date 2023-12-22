import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import ProfileCreateRoute from './ProfileCreateRoute';
import ProfileEditRoute from './ProfileEditRoute';
import UserRoute from './UserRoute';

import Layout from '@/layouts';

const Main = React.lazy(() => import('@/pages/main'));
const SignIn = React.lazy(() => import('@/pages/signin'));
const VerifyEmail = React.lazy(() => import('@/pages/auth/VerifyEmail'));
const Signup = React.lazy(() => import('@/pages/signup/Signup'));
const CreateProfile = React.lazy(() => import('@/pages/profile/create'));
const EditProfile = React.lazy(() => import('@/pages/profile/edit'));
const LoginAndSecurity = React.lazy(() => import('@/pages/profile/edit/login-and-security'));
const PersonalInfo = React.lazy(() => import('@/pages/profile/edit/personal-info'));
const ProfileSetting = React.lazy(() => import('@/pages/profile/edit/profile-settings'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Main /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },

  {
    path: '/account',
    element: (
      <PrivateRoute>
        <Layout maxWidth="xl" />
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
        <Layout maxWidth="xl" />
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
