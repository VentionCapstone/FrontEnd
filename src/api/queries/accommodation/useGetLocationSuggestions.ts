import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { SuggestionsResponse } from '@src/types/yandex_map.types';

function useGetLocationSuggestions(value: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.listOfSuggestions, value],
    queryFn: async () => {
      const { data } = await axios.get<SuggestionsResponse>(
        ENDPOINTS.accommodation.getListOfSuggestedLocations(value)
      );
      return data;
    },
    enabled: value.length > 2,
  });
}

export default useGetLocationSuggestions;
