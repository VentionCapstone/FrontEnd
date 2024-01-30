import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { SuggestionsResponse } from '@src/types/yandex_map.types';

function useGetSelectedAddress(value: [number, number]) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.selectedLocation, value],
    queryFn: async () => {
      const { data } = await axios.get<SuggestionsResponse>(
        ENDPOINTS.accommodation.getSelectedLocation(value)
      );
      return data.response.GeoObjectCollection.featureMember[0].GeoObject;
    },
    enabled: value[0] !== 0 && value[1] !== 0,
  });
}

export default useGetSelectedAddress;
