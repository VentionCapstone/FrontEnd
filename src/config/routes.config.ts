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
    details: (id: string) => `/rooms/${id}`,
  },
  bookings: {
    root: '/bookings',
  },
  payment: {
    root: (id: string, accommodationId: string, startDate: string, endDate: string) =>
      `/book/${id}?accommodationId=${accommodationId}&startDate=${startDate}&endDate=${endDate}`,
  },
  host: {
    details: (id: string) => `/host/${id}`,
  },
  wishlist: '/wishlist',
} as const;
