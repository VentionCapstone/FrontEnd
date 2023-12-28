import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import ProfileCreateRoute from './ProfileCreateRoute';
import ProfileEditRoute from './ProfileEditRoute';
import UserRoute from './UserRoute';

import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import UserLayout from '@/layouts/UserLayout';

const Main = React.lazy(() => import('@/pages/main'));
const SignIn = React.lazy(() => import('@/pages/signin'));
const VerifyEmail = React.lazy(() => import('@/pages/auth/VerifyEmail'));
const Signup = React.lazy(() => import('@/pages/signup/Signup'));
const CreateProfile = React.lazy(() => import('@/pages/profile/create'));
const EditProfile = React.lazy(() => import('@/pages/profile/edit'));
const LoginAndSecurity = React.lazy(() => import('@/pages/profile/edit/login-and-security'));
const PersonalInfo = React.lazy(() => import('@/pages/profile/edit/personal-info'));
const ProfileSetting = React.lazy(() => import('@/pages/profile/edit/profile-settings'));
const Accommodations = React.lazy(() => import('@/pages/accommodations'));
const AccommodationForm = React.lazy(() => import('@/pages/accommodations/AccommodationForm'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Main /> },
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
        <AuthLayout />
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
