import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import PrivateRoute from './PrivateRoute';
import UserRoute from './UserRoute';

const MainLayout = React.lazy(() => import('../layouts/MainLayout'));
const UserLayout = React.lazy(() => import('../layouts/UserLayout'));
const AuthLayout = React.lazy(() => import('../layouts/AuthLayout'));
const Main = React.lazy(() => import('../pages/main'));
const SignIn = React.lazy(() => import('../pages/sign-in'));
const Profile = React.lazy(() => import('../pages/profile'));
const VerifyEmail = React.lazy(() => import('../pages/auth/verify-email'));

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
      {
        index: true,
        element: <Navigate to="settings" />,
      },
      { path: 'settings', element: <Profile /> },
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
      { path: 'sign-in', element: <SignIn /> },
      { path: 'verify', element: <VerifyEmail /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={routes} />;
}
