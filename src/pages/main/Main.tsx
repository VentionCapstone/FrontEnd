import { Badge, Box, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import InfiniteScroll from 'react-infinite-scroll-component';
import MainModal from './components/Modal';
import { mainStyles } from './index.styles';
import Error from '../../components/shared/Error';
import { amountPerPage } from '../../config/pagination.config';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import AccommodationCard from '../../components/card/AccommodationCard';
import { Accommodation, DefaultSearchParamsType } from '../../types/accommodation.types';
import useGetAccommodationsQuery from '../../api/queries/main/useGetAccommodationsQuery';

const defaultSearchParams: DefaultSearchParamsType = {
  minPrice: '0',
  maxPrice: '0',
  rooms: '0',
  people: '0',
  orderByPrice: 'any',
  orderByPeople: 'any',
  orderByRooms: 'any',
};

function Main() {
  const [open, setOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({
    totalMaxPrice: 0,
    totalMinPrice: 0,
  });

  const [searchParams, setSearchParams] = useSearchParams(defaultSearchParams);

  const allValues: Record<string, string> = {};
  let changedParamsCount: number = 0;

  for (const [key, value] of searchParams.entries()) {
    allValues[key] = value;
    if (value !== defaultSearchParams[key as keyof DefaultSearchParamsType]) {
      changedParamsCount++;
    }
  }

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useGetAccommodationsQuery({
    allValues,
    amountPerPage,
  });

  useEffect(() => {
    if (data && data?.pages.length > 0) {
      const totalMaxPrice = data?.pages[0]?.priceRange?.totalMaxPrice || 0;
      const totalMinPrice = data?.pages[0]?.priceRange?.totalMinPrice || 0;

      setPriceRange({ totalMaxPrice, totalMinPrice });
    }
  }, [data]);

  const accommodations = useMemo(
    () => data?.pages.reduce((acc, page) => [...acc, ...page.data], [] as Accommodation[]),
    [data]
  );

  const handleOpen = useCallback(() => setOpen(true), []);

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
      <Badge
        badgeContent={changedParamsCount > 1 ? changedParamsCount : null}
        color="primary"
        sx={mainStyles.badgeNumber}
      >
        <Button variant="outlined" sx={mainStyles.filterButton} onClick={handleOpen}>
          <TuneIcon fontSize="small" />
          Filters
        </Button>
      </Badge>
      <InfiniteScroll
        dataLength={accommodations ? accommodations.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<LoadingPrimary height="30vh" />}
        className="main__scrollable"
      >
        <Box sx={mainStyles.accommmodationCard}>
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
