import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import PrivateRoute from './PrivateRoute';
import UserRoute from './UserRoute';
import Signup from '../pages/signup/Signup';

const MainLayout = React.lazy(() => import('../layouts/MainLayout'));
const UserLayout = React.lazy(() => import('../layouts/UserLayout'));
const AuthLayout = React.lazy(() => import('../layouts/AuthLayout'));
const Main = React.lazy(() => import('../pages/main'));
const SignIn = React.lazy(() => import('../pages/signin'));
const Profile = React.lazy(() => import('../pages/profile'));

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
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <Signup /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={routes} />;
}
