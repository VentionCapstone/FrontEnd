import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { Coordinates } from '@src/types/global.types';
import { SuggestionsResponse } from '@src/types/yandex_map.types';
import { selectGeoSearchFeaturedObjects } from '@src/utils';

function useGetSelectedAddress(selectedCoordinates: Coordinates) {
  const [latitude, longitude] = selectedCoordinates;

  return useQuery({
    queryKey: [QUERY_KEYS.query.selectedLocation, selectedCoordinates],
    queryFn: async () => {
      const { data } = await axios.get<SuggestionsResponse>(
        ENDPOINTS.accommodation.getSelectedLocation(selectedCoordinates)
      );
      const response = selectGeoSearchFeaturedObjects(data);
      return response[0]?.GeoObject;
    },
    enabled: latitude !== 0 && longitude !== 0,
  });
}

export default useGetSelectedAddress;
