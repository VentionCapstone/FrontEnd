import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { SEARCH_ALLOWED_LENGTH } from '@src/constants';
import { SuggestionsResponse } from '@src/types/yandex_map.types';

function useGetLocationSuggestions(searchValue: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.listOfSuggestions, searchValue],
    queryFn: async () => {
      const { data } = await axios.get<SuggestionsResponse>(
        ENDPOINTS.accommodation.getListOfSuggestedLocations(searchValue)
      );
      return data;
    },
    enabled: searchValue.length > SEARCH_ALLOWED_LENGTH,
  });
}

export default useGetLocationSuggestions;
