export const ENDPOINTS = {
  auth: {
    verifyEmail: '/auth/verify',
    updateEmail: '/auth/email',
    signOut: '/auth/signout',
  },
  account: {
    getUser: (userId: string) => `/users/${userId}`,
    getUserProfile: (profileId: string) => `/users/profile/${profileId}`,
    updateUserProfile: (profileId: string) => `/users/profile/${profileId}`,
    deleteUserProfile: (profileId: string) => `/users/profile/${profileId}`,
    createUserProfile: '/users/profile',
  },
  accommodation: {
    getAccommodations: '/accommodations/getAll',
    getAccommodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
    createAccommodation: '/accommodations',
    updateAccommodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
    deleteAccommodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
  },
  amenity: {
    root: (accommodationId: string) => `/amenities/${accommodationId}`,
    getAmenityList: '/amenities/list',
  },
  Accommodations: {
    Root: '/accommodations',
  },
} as const;
