export const ROUTES = {
  root: '/',
  auth: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  account: {
    root: '/account',
    create: '/account/create',
    edit: '/account/edit',
  },
  accommodations: {
    root: '/accommodations',
    create: '/accommodations/create',
    edit: (id: string) => `/accommodations/edit/${id}`,
  },
  payment: {
    root: (id: string) => `/book/${id}`,
  },
} as const;
