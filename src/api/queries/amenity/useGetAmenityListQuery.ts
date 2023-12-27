import { useQuery } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { AmenityListResponse } from '../../../types/amenity.types';
import { buildAmenityList } from '../../../pages/accomodation/utils/amenityListBuilder';
import { QUERY_KEYS } from '../../../config/react-query.config';

const fetchAmenityList = async () => {
  const { data } = await httpClient.get<AmenityListResponse>(
    EndpointsConfig.Amenity.GetAmenityList
  );
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
