import { useQuery } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { AccommodationAmenitiesResponse } from '../../../types/amenity.types';
import { QUERY_KEYS } from '../../../config/react-query.config';

const fetchAccomodationAmenities = async (accomodationId: string) => {
  const { data } = await httpClient.get<AccommodationAmenitiesResponse>(
    EndpointsConfig.Amenity.Root(accomodationId)
  );
  return data;
};

type Params = {
  isNewAccomodation: boolean;
  accomodationId: string;
};

export const useGetAccomodationAmenitiesQuery = ({ accomodationId, isNewAccomodation }: Params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.accomodationAmenities, accomodationId, isNewAccomodation],
    queryFn: async () => {
      if (isNewAccomodation) return {};

      const data = await fetchAccomodationAmenities(accomodationId);
      return data.data;
    },
    retry: 0,
  });
};
