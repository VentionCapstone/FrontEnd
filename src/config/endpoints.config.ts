export const EndpointsConfig = {
  Auth: {
    VerifyEmail: '/auth/verify',
    SignOut: '/auth/signout',
  },
  Account: {
    GetUser: (userId: string) => `/users/${userId}`,
  },
  Amenity: {
    Root: (accommodationId: string) => `/amenities/${accommodationId}`,
    GetAmenityList: '/amenities/list',
  },
  Accommodations: {
    Root: '/accommodations',
  },
} as const;
