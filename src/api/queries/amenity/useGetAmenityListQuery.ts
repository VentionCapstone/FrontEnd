import { useQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { buildAmenityList } from '@src/pages/accomodation/utils/amenityListBuilder';
import { AmenityListResponse } from '@src/types/amenity.types';

const fetchAmenityList = async () => {
  const { data } = await httpClient.get<AmenityListResponse>(ENDPOINTS.amenity.getAmenityList);
  return data;
};

export const useGetAmenityListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.amenitiesList],
    queryFn: async () => {
      const data = await fetchAmenityList();
      return buildAmenityList(data.data);
    },
  });
};
