import { useQuery } from '@tanstack/react-query';
import { UserResponse } from '../../../types/profile.types';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { setUser } from '../../../stores/slices/authSlice';
import httpClient from '../../httpClient';

function useGetUserQuery(userId: string | null, isLoggedIn: boolean) {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await httpClient.get<UserResponse>(`/users/${userId}`);
      dispatch(setUser(data.data));
      return data;
    },
    enabled: isLoggedIn && userId !== null,
  });
}

export default useGetUserQuery;
