import { useInfiniteQuery } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { ResponseAccommodationList } from '../../../types/accommodation.types';
import { EndpointsConfig } from '../../../config/endpoints.config';

interface Props {
  allValues: Record<string, string | null>;
  amountPerPage: number;
}

function useGetAccommodationsQuery({ allValues, amountPerPage }: Props) {
  return useInfiniteQuery({
    queryKey: ['accommodations', allValues],
    queryFn: async ({ pageParam }) => {
      const { minPrice, maxPrice, rooms, people, orderByPrice, orderByPeople, orderByRooms } =
        allValues;

      const { data } = await httpClient.get<ResponseAccommodationList>(
        EndpointsConfig.Accommodations.Root,
        {
          params: {
            page: pageParam,
            limit: amountPerPage,
            maxPrice: maxPrice !== '0' ? maxPrice : undefined,
            minPrice: minPrice !== '0' ? minPrice : undefined,
            minRooms: rooms !== '0' ? rooms : undefined,
            minPeople: people !== '0' ? people : undefined,
            orderByPrice: orderByPrice !== 'any' ? orderByPrice : undefined,
            orderByPeople: orderByPeople !== 'any' ? orderByPeople : undefined,
            orderByRooms: orderByRooms !== 'any' ? orderByRooms : undefined,
          },
        }
      );

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.totalCount / amountPerPage) {
        return pages.length + 1;
      }
      return undefined;
    },
  });
}

export default useGetAccommodationsQuery;
