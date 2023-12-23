import { Badge, Box, Button, Stack, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import InfiniteScroll from 'react-infinite-scroll-component';
import MainModal from './components/Modal';
import { mainStyles } from './index.styles';
import DataFetchError from '../../components/shared/DataFetchError';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import AccommodationCard from '../../components/card/AccommodationCard';
import { Accommodation, DefaultSearchParamsType } from '../../types/accommodation.types';
import useGetAccommodationsQuery from '../../api/queries/main/useGetAccommodationsQuery';

const defaultSearchParams: DefaultSearchParamsType = {
  minPrice: '0',
  maxPrice: '0',
  minRooms: '0',
  minPeople: '0',
  orderByPrice: 'any',
  orderByPeople: 'any',
  orderByRoom: 'any',
};

function Main() {
  const [open, setOpen] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const [priceRange, setPriceRange] = useState({
    totalMaxPrice: 0,
    totalMinPrice: 0,
  });

  const [searchParams, setSearchParams] = useSearchParams(defaultSearchParams);

  const searchParamsAsObject = useMemo(() => {
    const values: Record<string, string> = {};
    return values;
  }, []);

  for (const [key, value] of searchParams.entries()) {
    searchParamsAsObject[key] = value;
  }

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useGetAccommodationsQuery({
    searchParamsAsObject,
  });

  useEffect(() => {
    if (!data) return;

    if (data.pages.length > 0) {
      const totalMaxPrice = data.pages[0].priceRange.totalMaxPrice || 0;
      const totalMinPrice = data.pages[0].priceRange.totalMinPrice || 0;

      setPriceRange({ totalMaxPrice, totalMinPrice });
    }
  }, [data]);

  const accommodations = useMemo(
    () => data?.pages.reduce((acc, page) => [...acc, ...page.data], [] as Accommodation[]),
    [data]
  );

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleNextPage = useCallback(() => fetchNextPage(), [fetchNextPage]);

  if (isPending) {
    return (
      <Box>
        <LoadingPrimary />
      </Box>
    );
  }
  if (isError) {
    return <DataFetchError error="Failed to get accommodation list" />;
  }

  return (
    <Box>
      <Badge invisible={!invisible} color="primary" badgeContent=" " sx={mainStyles.badgeNumber}>
        <Button variant="outlined" sx={mainStyles.filterButton} onClick={handleOpen}>
          <TuneIcon fontSize="small" />
          Filters
        </Button>
      </Badge>
      {accommodations?.length === 0 ? (
        <Stack justifyContent={'center'} alignItems={'center'} height="20vh">
          <Typography variant={'lg'}>No accommodations found</Typography>
        </Stack>
      ) : (
        <InfiniteScroll
          dataLength={accommodations?.length || 0}
          next={handleNextPage}
          hasMore={hasNextPage}
          loader={<LoadingPrimary height="30vh" />}
        >
          <Box sx={mainStyles.accommmodationCard}>
            {accommodations?.map((accommodation) => (
              <AccommodationCard key={accommodation.id} accommodation={accommodation} />
            ))}
          </Box>
        </InfiniteScroll>
      )}
      {open && (
        <MainModal
          open={open}
          setOpen={setOpen}
          filters={searchParamsAsObject}
          setFilters={setSearchParams}
          priceRange={priceRange}
          setInvisible={setInvisible}
        />
      )}
    </Box>
  );
}

export default Main;
