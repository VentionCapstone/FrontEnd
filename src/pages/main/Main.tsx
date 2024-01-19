import TuneIcon from '@mui/icons-material/Tune';
import { Badge, Box, Button, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

import useGetAccommodationsQuery from '@src/api/queries/main/useGetAccommodationsQuery';
import AccommodationCard from '@src/components/card/AccommodationCard';
import DataFetchError from '@src/components/shared/DataFetchError';
import { Accommodation, DefaultSearchParamsType } from '@src/types/accommodation.types';
import { ErrorTypes } from '@src/types/i18n.types';
import AccommodationSkeleton from '../accommodations/AccommodationSkeleton';
import MainModal from './components/Modal';
import SearchBar from './components/SearchBar';
import { mainStyles } from './index.styles';

const defaultSearchParams: DefaultSearchParamsType = {
  minPrice: '0',
  maxPrice: '0',
  minRooms: '0',
  minPeople: '0',
  orderByPrice: 'any',
  orderByPeople: 'any',
  orderByRoom: 'any',
  location: '',
  checkInDate: '',
  checkOutDate: '',
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

    for (const [key, value] of searchParams.entries()) {
      values[key] = value;
    }

    return values;
  }, [searchParams]);

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useGetAccommodationsQuery({
    searchParamsAsObject,
  });

  useEffect(() => {
    if (!data) return;

    if (data?.pages?.length > 0) {
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

  const renderAccommodationSkeleton = useCallback(
    () => (
      <Box sx={mainStyles.accommmodationCard}>
        <AccommodationSkeleton />;
      </Box>
    ),
    []
  );

  if (isPending) {
    renderAccommodationSkeleton();
  }
  if (isError) {
    return <DataFetchError errorKey={ErrorTypes.accommodation_failed_to_get_list} />;
  }

  return (
    <Box>
      <Box sx={mainStyles.searchBarBox}>
        <SearchBar
          priceRange={priceRange}
          setSearchParams={setSearchParams}
          searchParamsAsObject={searchParamsAsObject}
        />
        <Badge invisible={!invisible} color="primary" badgeContent=" " sx={mainStyles.badgeNumber}>
          <Button variant="outlined" sx={mainStyles.filterButton} onClick={handleOpen}>
            <TuneIcon fontSize="small" />
          </Button>
        </Badge>
      </Box>

      {accommodations?.length === 0 && (
        <Stack justifyContent={'center'} alignItems={'center'} height="20vh">
          <Typography variant={'lg'}>No accommodations found</Typography>
        </Stack>
      )}

      {accommodations?.length !== 0 && (
        <InfiniteScroll
          dataLength={accommodations?.length || 0}
          next={handleNextPage}
          hasMore={hasNextPage}
          loader={renderAccommodationSkeleton()}
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
          location={searchParamsAsObject['location']}
          checkInDate={searchParamsAsObject['checkInDate']}
          checkOutDate={searchParamsAsObject['checkOutDate']}
        />
      )}
    </Box>
  );
}

export default Main;
