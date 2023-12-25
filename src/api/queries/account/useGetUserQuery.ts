import { useQuery } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { setUser } from '@/stores/slices/authSlice';
import { UserResponse } from '@/types/user.types';

function useGetUserQuery(userId: string | null, isLoggedIn: boolean) {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [QUERY_KEYS.query.user],
    queryFn: async () => {
      const { data } = await httpClient.get<UserResponse>(
        ENDPOINTS.account.getUser(userId as string)
      );
      dispatch(setUser(data.data));
      return data;
    },
    enabled: isLoggedIn && userId !== null,
  });
}

export default useGetUserQuery;
