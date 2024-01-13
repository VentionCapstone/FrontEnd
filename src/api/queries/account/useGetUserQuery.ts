import { useQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { useAppDispatch } from '@src/hooks/redux-hooks';
import { setUser } from '@src/stores/slices/authSlice';
import { UserResponse } from '@src/types/user.types';
import { getValueFromLocalStorage } from '@src/utils';

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
