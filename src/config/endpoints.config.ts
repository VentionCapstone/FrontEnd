export const EndpointsConfig = {
  Auth: {
    SignIn: '/auth/signin',
    SignUp: '/auth/signup',
    VerifyEmail: '/auth/verify',
    UpdateEmail: '/auth/email',
    SignOut: '/auth/signout',
  },
  Account: {
    GetUser: (userId: string) => `/users/${userId}`,
    GetUserProfile: (profileId: string) => `/users/profile/${profileId}`,
    UpdateUserProfile: (profileId: string) => `/users/${profileId}`,
    DeleteUserProfile: (profileId: string) => `/users/${profileId}`,
    CreateUserProfile: '/users/profile',
  },
  Amenity: {
    Root: (accommodationId: string) => `/amenities/${accommodationId}`,
    GetAmenityList: '/amenities/list',
  },
  Accommodations: {
    Root: '/accommodations',
    GetAccommodationReviws: (accommodationId: string) =>
      `/accommodations/${accommodationId}/reviews`,
  },
  Booking: {
    GetAvailableDates: (accommodationId: string) => `/booking/available-dates/${accommodationId}`,
    book: '/booking/book',
  },
} as const;
