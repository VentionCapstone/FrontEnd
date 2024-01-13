import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import ProfileCreateRoute from './ProfileCreateRoute';
import ProfileEditRoute from './ProfileEditRoute';
import UserRoute from './UserRoute';

import MainLayout from '@src/layouts/MainLayout';
import UserLayout from '@src/layouts/UserLayout';

import SignIn from '@src/pages/auth/SignIn';
import Signup from '@src/pages/auth/Signup';

const Main = React.lazy(() => import('@src/pages/main'));
const VerifyEmail = React.lazy(() => import('@src/pages/auth/components/VerifyEmail'));
const CreateProfile = React.lazy(() => import('@src/pages/profile/create'));
const EditProfile = React.lazy(() => import('@src/pages/profile/edit'));
const LoginAndSecurity = React.lazy(() => import('@src/pages/profile/edit/login-and-security'));
const PersonalInfo = React.lazy(() => import('@src/pages/profile/edit/personal-info'));
const ProfileSetting = React.lazy(() => import('@src/pages/profile/edit/profile-settings'));
const Accommodations = React.lazy(() => import('@src/pages/accommodations'));
const AccommodationForm = React.lazy(() => import('@src/pages/accommodations/AccommodationForm'));
const Payment = React.lazy(() => import('../pages/payment/Payment'));
const Accommodation = React.lazy(() => import('../pages/accomodation/Accommodation'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Main /> },
      { path: 'book/:id', element: <Payment /> },
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

  {
    path: '/accommodations',
    element: <MainLayout />,
    children: [
      { path: '', element: <Accommodations /> },
      { path: 'create', element: <AccommodationForm /> },
      { path: 'edit/:id', element: <AccommodationForm /> },
      { path: '*', element: <Navigate to="/accommodations" /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={routes} />;
}
