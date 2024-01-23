export const ENDPOINTS = {
  auth: {
    signIn: '/auth/signin',
    googleSignIn: '/auth/google/login',
    signUp: '/auth/signup',
    verifyEmail: '/auth/verify',
    updateEmail: '/auth/email',
    signOut: '/auth/signout',
    resetPassword: '/auth/forgot-password-reset',
    forgotPasswordEmail: '/auth/forgot-password-email',
    updatePassword: '/auth/password',
  },
  account: {
    getUser: (userId: string | null) => `/users/${userId}`,
    getUserProfile: (profileId: string) => `/users/profile/${profileId}`,
    updateUserProfile: (profileId: string) => `/users/${profileId}`,
    deleteUserProfile: (profileId: string) => `/users/${profileId}`,
    createUserProfile: '/users/profile',
  },
  accommodation: {
    root: '/accommodations',
    getUserAccommodations: (userId: string) => {
      return `/accommodations/${userId}/accommodations`;
    },
    getAccommodation: (accommodationId: string | undefined) => `/accommodations/${accommodationId}`,
    updateAccommodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
    deleteAccommodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
    restoreAccommodation: (accommodationId: string) => `/accommodations/${accommodationId}/restore`,
    getAccommodationReviews: (accommodationId: string) =>
      `/accommodations/${accommodationId}/reviews`,

    getAccommodationMedia: (accommodationId: string) => `/accommodations/${accommodationId}/media`,

    uploadMediaToAccommodation: (accommodationId: string) =>
      `/accommodations/${accommodationId}/file`,

  },
  payment: {
    root: '/payment',
    postConfirmPayment: '/payment/confirm',
  },
  amenity: {
    root: (accommodationId: string) => `/amenities/${accommodationId}`,
    getAmenityList: '/amenities',
  },
  booking: {
    getAvailableDates: (accommodationId: string) => `/booking/available-dates/${accommodationId}`,
    book: '/booking/book',
  },
  wishlist: {
    root: '/wishlist',
    addToWishlist: (accommodationId: string) => `/wishlist/${accommodationId}`,
    deleteFromWishlist: (accommodationId: string) => `/wishlist/${accommodationId}`,
  },
  host: {
    getHostProfile: (hostId: string) => `/users/host/${hostId}`,
  },
} as const;
