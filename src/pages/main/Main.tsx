import { useMemo, useState } from 'react';
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
    minPrice: 0,
    maxPrice: 0,
  });

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['accommodations', filters],
    queryFn: async ({ pageParam }) => {
      const { data } = await httpClient.get<ResponseAccommodationList>(`/accommodations`, {
        params: {
          page: pageParam,
          limit: amountPerPage,
          maxPrice: filters.maxPrice > 0 ? filters.maxPrice : undefined,
          minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
        },
      });
      setFilters({
        minPrice: data.priceRange.minPrice,
        maxPrice: data.priceRange.maxPrice,
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
