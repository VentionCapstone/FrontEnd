import { Box, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Error from '../../components/shared/Error';
import MainModal from './components/Modal';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import AccommodationCard from '../../components/card/AccommodationCard';
import { amountPerPage } from '../../config/pagination.config';
import { Accommodation } from '../../types/accommodation.types';
import useGetAccommodationsQuery from '../../api/queries/main/useGetAccommodationsQuery';

function Main() {
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    minPrice: '0',
    maxPrice: '0',
    rooms: '0',
    people: '0',
    orderByPrice: 'any',
    orderByPeople: 'any',
    orderByRooms: 'any',
  });

  const allValues: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    allValues[key] = value;
  }

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useGetAccommodationsQuery({
    allValues,
    amountPerPage,
  });

  const [priceRange, setPriceRange] = useState({
    totalMaxPrice: 0,
    totalMinPrice: 0,
  });

  useEffect(() => {
    if (data && data?.pages.length > 0) {
      setPriceRange({
        totalMaxPrice: data.pages[0].priceRange.totalMaxPrice,
        totalMinPrice: data.pages[0].priceRange.totalMinPrice,
      });
    }
  }, [data]);

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
        <MainModal
          open={open}
          setOpen={setOpen}
          filters={allValues}
          setFilters={setSearchParams}
          priceRange={priceRange}
        />
      )}
    </Box>
  );
}

export default Main;
