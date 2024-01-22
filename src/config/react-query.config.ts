import { STALE_TIME } from '@src/constants';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
});

export const QUERY_KEYS = {
  query: {
    user: 'user',
    amenitiesList: 'amenities_list',
    accomodationAmenities: 'accomodation_amenities',

    availableDates: 'available_dates',

    accommodation: 'accommodation',
    accommodations: 'accommodations',
    accomodationReviews: 'accomodation_reviews',
  },
  mutation: {
    createAccount: 'create_account',
    editAccount: 'edit_account',
    verifyEmail: 'verify_email',
    logout: 'logout',
    updateUserImage: 'update_user_image',
  },
} as const;
