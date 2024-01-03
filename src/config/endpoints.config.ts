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
    UpdateUserProfile: (profileId: string) => `/users/profile/${profileId}`,
    DeleteUserProfile: (profileId: string) => `/users/profile/${profileId}`,
    CreateUserProfile: '/users/profile',
  },
  Amenity: {
    Root: (accommodationId: string) => `/amenities/${accommodationId}`,
    GetAmenityList: '/amenities/list',
  },
  Accommodations: {
    Root: '/accommodations',
    GetSingleAccommodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
  },
} as const;
