import { useQuery } from '@tanstack/react-query';

import httpClient from '@/api/httpClient';
import { ENDPOINTS } from '@/config/endpoints.config';
import { LOCAL_STORAGE_KEYS } from '@/config/local-storage.config';
import { QUERY_KEYS } from '@/config/react-query.config';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { setUser } from '@/stores/slices/authSlice';
import { UserResponse } from '@/types/user.types';
import { getValueFromLocalStorage } from '@/utils';

function useGetUserQuery() {
  const dispatch = useAppDispatch();
  const userId = getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.sub);

  return useQuery({
    queryKey: [QUERY_KEYS.query.user],
    queryFn: async () => {
      const { data } = await httpClient.get<UserResponse>(ENDPOINTS.account.getUser(userId));
      dispatch(setUser(data.data));
      return data.data;
    },
    enabled: !!userId,
  });
}

export default useGetUserQuery;
