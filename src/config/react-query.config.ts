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
    accomodationAmenities: 'accomodation_amenities',
    availableDates: 'available_dates',
  },
  mutation: {
    createAccount: 'create_account',
    editAccount: 'edit_account',
    verifyEmail: 'verify_email',
    logout: 'logout',
  },
} as const;
