import { useMemo } from 'react';
import { Box } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import httpClient from '../../api/httpClient';
import Error from '../../components/shared/Error';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import AccommodationCard from '../../components/card/AccommodationCard';
import { Accommodation, ResponseAccommodationList } from '../../types/accommodation.types';

function Main() {
  const limit = 12;
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['accommodations'],
    queryFn: async ({ pageParam }) => {
      const { data } = await httpClient.get<ResponseAccommodationList>(`/accommodations`, {
        params: {
          page: pageParam,
          limit,
        },
      });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage, pages);
      if (pages.length < lastPage.totalCount / limit) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  const accommodations = useMemo(
    () => data?.pages.reduce((acc, page) => [...acc, ...page.data], [] as Accommodation[]),
    [data]
  );

  if (isPending) {
    return (
      <Box>
        <LoadingPrimary />
      </Box>
    );
  }
  if (isError) {
    return <Error error="Failed to get accommodation list" />;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={accommodations ? accommodations.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<LoadingPrimary height="30vh" />}
        className="main__scrollable"
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'start',
            rowGap: 10,
            columnGap: 4,
          }}
        >
          {accommodations?.map((accommodation) => (
            <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
        </Box>
      </InfiniteScroll>
    </>
  );
}

export default Main;
