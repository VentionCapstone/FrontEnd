import { useInfiniteQuery } from '@tanstack/react-query';
import httpClient from '../../httpClient';
import { ResponseAccommodationList } from '../../../types/accommodation.types';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { AMOUNT_PER_PAGE } from '../../../config/pagination.config';

interface AccommodationsQueryProps {
  searchParamsAsObject: Record<string, string | null>;
}

function useGetAccommodationsQuery({ searchParamsAsObject }: AccommodationsQueryProps) {
  return useInfiniteQuery({
    queryKey: ['accommodations', searchParamsAsObject],
    queryFn: async ({ pageParam }) => {
      const { minPrice, maxPrice, minRooms, minPeople, orderByPrice, orderByPeople, orderByRoom } =
        searchParamsAsObject;

      const { data } = await httpClient.get<ResponseAccommodationList>(
        EndpointsConfig.Accommodations.Root,
        {
          params: {
            page: pageParam,
            limit: AMOUNT_PER_PAGE,
            maxPrice: Number(maxPrice) || null,
            minPrice: Number(minPrice) || null,
            minRooms: Number(minRooms) || null,
            minPeople: Number(minPeople) || null,
            orderByPrice: orderByPrice == 'any' ? null : orderByPrice,
            orderByPeople: orderByPeople == 'any' ? null : orderByPeople,
            orderByRoom: orderByRoom == 'any' ? null : orderByRoom,
          },
        }
      );

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.totalCount / AMOUNT_PER_PAGE) {
        return pages.length + 1;
      }
      return;
    },
  });
}

export default useGetAccommodationsQuery;
