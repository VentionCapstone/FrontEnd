import { useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import httpClient from '../../api/httpClient';
import Error from '../../components/shared/Error';
import MainModal from '../../components/modal/Modal';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import AccommodationCard from '../../components/card/AccommodationCard';
import { amountPerPage } from '../../config/pagination.config';
import {
  Accommodation,
  InputFilter,
  ResponseAccommodationList,
} from '../../types/accommodation.types';

function Main() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<InputFilter>({
    totalMaxPrice: 0,
    totalMinPrice: 0,
    curMaxPrice: 0,
    curMinPrice: 0,
    rooms: 0,
    people: 0,
    orderByPrice: 'any',
    orderByPeople: 'any',
    orderByRooms: 'any',
  });

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['accommodations', filters],
    queryFn: async ({ pageParam }) => {
      const { data } = await httpClient.get<ResponseAccommodationList>(`/accommodations`, {
        params: {
          page: pageParam,
          limit: amountPerPage,
          maxPrice: filters.curMaxPrice > 0 ? filters.curMaxPrice : undefined,
          minPrice: filters.curMinPrice > 0 ? filters.curMinPrice : undefined,
          minRooms: filters.rooms && filters.rooms > 0 ? filters.rooms : undefined,
          minPeople: filters.people && filters.people > 0 ? filters.people : undefined,
          orderByPrice: filters.orderByPrice !== 'any' ? filters.orderByPrice : undefined,
          orderByPeople: filters.orderByPeople !== 'any' ? filters.orderByPeople : undefined,
          orderByRooms: filters.orderByRooms !== 'any' ? filters.orderByRooms : undefined,
        },
      });

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

  useEffect(() => {
    if (data && data?.pages.length > 0) {
      if (data.pages[0].priceRange.curMaxPrice !== filters.curMaxPrice) {
        setFilters({
          curMaxPrice: data.pages[0].priceRange.curMaxPrice,
          curMinPrice: data.pages[0].priceRange.curMinPrice,
          totalMaxPrice: data.pages[0].priceRange.totalMaxPrice,
          totalMinPrice: data.pages[0].priceRange.totalMinPrice,
        });
      }
    }
  }, [data, filters]);

  const accommodations = useMemo(
    () => data?.pages.reduce((acc, page) => [...acc, ...page.data], [] as Accommodation[]),
    [data]
  );

  const handleOpen = () => setOpen(true);

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
    <Box>
      <Button
        variant="contained"
        sx={{
          display: 'flex',
          marginLeft: 'auto',
          marginBottom: '2rem',
        }}
        onClick={handleOpen}
      >
        Filter
      </Button>
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
      {open && (
        <MainModal open={open} setOpen={setOpen} filters={filters} setFilters={setFilters} />
      )}
    </Box>
  );
}

export default Main;
