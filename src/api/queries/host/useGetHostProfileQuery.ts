import { useQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { HostProfileResponse } from '@src/types/hostProfile.types';

function useGetHostProfileQuery(hostId: string) {
  return useQuery({
    queryKey: [hostId],
    queryFn: async () => {
      const data = await httpClient.get<HostProfileResponse>(ENDPOINTS.host.getHostProfile(hostId));
      return data.data.data;
    },
  });
}

export default useGetHostProfileQuery;
