export const RoutesConfig = {
  Root: '/',
  Hosting: '/hosting',
  Auth: {
    SignIn: '/auth/signin',
    SignUp: '/auth/signup',
  },
  Account: {
    Root: '/account',
    Create: '/account/create',
    Edit: '/account/edit',
  },
} as const;
