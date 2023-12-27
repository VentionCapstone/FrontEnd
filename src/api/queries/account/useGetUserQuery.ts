import { useQuery } from '@tanstack/react-query';
import { UserResponse } from '../../../types/user.types';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { QUERY_KEYS } from '../../../config/react-query.config';
import { setUser } from '../../../stores/slices/authSlice';
import httpClient from '../../httpClient';

function useGetUserQuery(userId: string | null, isLoggedIn: boolean) {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: [QUERY_KEYS.query.user],
    queryFn: async () => {
      const { data } = await httpClient.get<UserResponse>(
        EndpointsConfig.Account.GetUser(userId as string)
      );
      dispatch(setUser(data.data));
      return data;
    },
    enabled: isLoggedIn && userId !== null,
  });
}

export default useGetUserQuery;
