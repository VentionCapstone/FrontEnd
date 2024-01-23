import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import ProfileCreateRoute from './ProfileCreateRoute';
import ProfileEditRoute from './ProfileEditRoute';

import UserRoute from './UserRoute';

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
const AccommodationForm = React.lazy(() => import('@src/pages/accommodations/AccommodationForm'));
const Payment = React.lazy(() => import('@src/pages/payment/Payment'));
const Accommodation = React.lazy(() => import('@src/pages/accomodation/Accommodation'));
const SignIn = React.lazy(() => import('@src/pages/auth/SignIn'));
const Signup = React.lazy(() => import('@src/pages/auth/Signup'));
const ResetPassword = React.lazy(() => import('@src/pages/auth/ResetPassword'));
const Host = React.lazy(() => import('@src/pages/host/Host'));
const Wishlist = React.lazy(() => import('../pages/wishlist'));

const routes = createBrowserRouter([
  //unprotected
  {
    path: '/',
    children: [
      {
        path: '',
        element: <MainLayout />,
        children: [
          { index: true, element: <Main /> },
          { path: '*', element: <Navigate to="/" /> },
        ],
      },

      {
        path: '',
        element: <UserLayout />,
        children: [
          { path: 'rooms/:id', element: <Accommodation /> },
          { path: 'host/:id', element: <Host /> },
        ],
      },
    ],
  },

  //UserRoute
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

  //PrivateRoute
  {
    path: '/',
    element: (
      <PrivateRoute>
        <UserLayout />
      </PrivateRoute>
    ),
    children: [
      { path: 'book/:id', element: <Payment /> },

      {
        path: '/account',
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
        path: '/accommodations',
        children: [
          { index: true, element: <Accommodations /> },
          { path: 'create', element: <AccommodationForm /> },
          { path: 'edit/:id', element: <AccommodationForm /> },
          { path: '*', element: <Navigate to="/accommodations" /> },
        ],
      },

      { path: '/wishlist', element: <Wishlist /> },

      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={routes} />;
}
