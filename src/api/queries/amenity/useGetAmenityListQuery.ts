import { useQuery } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { buildAmenityList } from '../../../pages/accomodation/utils/amenityListBuilder';
import { AmenityListResponse } from '../../../types/amenity.types';

const fetchAmenityList = async () => {
  const { data } = await httpClient.get<AmenityListResponse>('/amenities/list');
  return data;
};

export const useGetAmenityListQuery = () => {
  return useQuery({
    queryKey: ['amenities_list'],
    queryFn: async () => {
      const data = await fetchAmenityList();
      return buildAmenityList(data.data);
    },
  });
};
