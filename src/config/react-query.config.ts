import { STALE_TIME } from '@src/constants';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const QUERY_KEYS = {
  query: {
    user: 'user',
    amenitiesList: 'amenities_list',

    availableDates: 'available_dates',

    accommodation: 'accommodation',
    hostedAccommodation: 'hostedAccommodation',
    accommodations: 'accommodations',
    accomodationReviews: 'accomodation_reviews',

    bookings: 'bookings',
    wishlist: 'wishlist',
  },

  mutation: {
    createAccount: 'create_account',
    editAccount: 'edit_account',

    verifyEmail: 'verify_email',

    logout: 'logout',

    addToWishlist: 'add_to_wishlist',
    deleteFromWishlist: 'delete_from_wishlist',
  },
} as const;
