import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 5 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export const QUERY_KEYS = {
  query: {
    user: 'user',
    amenitiesList: 'amenities_list',
    accommodation: 'accommodation',
    accomodationAmenities: 'accomodation_amenities',
    accomodationReviews: 'accomodation_reviews',
  },
  mutation: {
    createAccount: 'create_account',
    editAccount: 'edit_account',
    verifyEmail: 'verify_email',
    logout: 'logout',
  },
} as const;
