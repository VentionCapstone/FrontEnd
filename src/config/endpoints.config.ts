import { YANDEX_API_URL } from '@src/api/api';
import { Coordinates } from '@src/types/global.types';

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
    updateProfileImage: (profileId: string) => `/users/${profileId}/image`,
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
    getListOfSuggestedLocations: (coordinates: string) =>
      `${YANDEX_API_URL}&geocode=${coordinates}`,
    getSelectedLocation: (coordinates: Coordinates) =>
      `${YANDEX_API_URL}&geocode=${coordinates[1]},${coordinates[0]}`,
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
    book: '/booking/book',
    getBookingList: '/booking/my-bookings',
    getAvailableDates: (accommodationId: string) => `/booking/available-dates/${accommodationId}`,
  },
  wishlist: {
    root: '/wishlist',
    addToWishlist: (accommodationId: string) => `/wishlist/${accommodationId}`,
    deleteFromWishlist: (accommodationId: string) => `/wishlist/${accommodationId}`,
  },
  host: {
    getHostProfile: (hostId: string) => `/users/host/${hostId}`,
  },
  review: {
    create: (accommodationId: string, bookingId: string) =>
      `/reviews/${accommodationId}?bookingId=${bookingId}`,
  },
} as const;
