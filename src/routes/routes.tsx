import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import ProfileCreateRoute from './ProfileCreateRoute';
import ProfileEditRoute from './ProfileEditRoute';

import UserRoute from './UserRoute';

import ErrorPage from '@src/components/shared/ErrorPage';
import MainLayout from '@src/layouts/MainLayout';
import UserLayout from '@src/layouts/UserLayout';

const Main = React.lazy(() => import('@src/pages/main'));
const VerifyEmail = React.lazy(() => import('@src/pages/auth/VerifyEmail'));
const CreateProfile = React.lazy(() => import('@src/pages/profile/create'));
const EditProfile = React.lazy(() => import('@src/pages/profile/edit'));
const LoginAndSecurity = React.lazy(() => import('@src/pages/profile/edit/login-and-security'));
const PersonalInfo = React.lazy(() => import('@src/pages/profile/edit/personal-info'));
const ProfileSetting = React.lazy(() => import('@src/pages/profile/edit/profile-settings'));
const Accommodations = React.lazy(() => import('@src/pages/accommodations'));
const Payment = React.lazy(() => import('../pages/payment/Payment'));
const Accommodation = React.lazy(() => import('../pages/accomodation/Accommodation'));
const SignIn = React.lazy(() => import('../pages/auth/SignIn'));
const Signup = React.lazy(() => import('../pages/auth/Signup'));
const ResetPassword = React.lazy(() => import('../pages/auth/ResetPassword'));
const CreateAccommodation = React.lazy(() => import('../pages/accommodations/CreateAccommodation'));
const UpdateAccommodation = React.lazy(() => import('../pages/accommodations/UpdateAccommodation'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Main /> },
      { path: 'rooms/:id', element: <Accommodation /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },

  {
    path: '/',
    element: (
      <PrivateRoute>
        <UserLayout />
      </PrivateRoute>
    ),
    children: [
      { path: 'book/:id', element: <Payment /> },
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
      { path: 'forgot-password-reset', element: <ResetPassword /> },
    ],
  },

  {
    path: '/accommodations',
    element: <MainLayout />,
    children: [
      { path: '', element: <Accommodations /> },
      { path: 'create', element: <CreateAccommodation /> },
      { path: 'edit/:id', element: <UpdateAccommodation /> },
      { path: '*', element: <Navigate to="/accommodations" /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={routes} />;
}
