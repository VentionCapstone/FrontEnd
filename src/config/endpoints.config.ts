export const ENDPOINTS = {
  auth: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    verifyEmail: '/auth/verify',
    updateEmail: '/auth/email',
    signOut: '/auth/signout',
  },
  account: {
    getUser: (userId: string | null) => `/users/${userId}`,
    getUserProfile: (profileId: string) => `/users/profile/${profileId}`,
    updateUserProfile: (profileId: string) => `/users/profile/${profileId}`,
    deleteUserProfile: (profileId: string) => `/users/profile/${profileId}`,
    createUserProfile: '/users/profile',
  },
  accommodation: {
    root: '/accommodations',
    getAccommodations: '/accommodations/getAll',
    getAccommodation: (accommodationId: string | undefined) => `/accommodations/${accommodationId}`,
    updateAccommodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
    deleteAccommodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
    getAccommodationReviews: (accommodationId: string) =>
      `/accommodations/${accommodationId}/reviews`,
  },
  payment: {
    root: '/payment',
    postConfirmPayment: '/payment/confirm',
  },
  amenity: {
    root: (accommodationId: string) => `/amenities/${accommodationId}`,
    getAmenityList: '/amenities/list',
  },
} as const;
