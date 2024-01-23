import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useGetBookingList } from '@src/api/queries/booking/useGetBookingList';
import DataFetchError from '@src/components/shared/DataFetchError';
import { STATUSES } from '@src/constants';
import { BookType } from '@src/types/booking.types';
import { STATUS } from '@src/types/global.types';
import { ErrorTypes } from '@src/types/i18n.types';
import { capitalize } from '@src/utils/capitalize';
import AccommodationSkeleton from '../accommodations/components/AccommodationSkeleton';
import BookingCard from './BookingCard';

export default function Bookings() {
  const [value, setValue] = useState<STATUS>('PENDING');

  const a11yProps = useMemo(() => {
    return Object.values(STATUSES).map((status, index) => {
      return {
        'label': capitalize(status),
        'status': status,
        'value': status,
        'id': `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    });
  }, []);

  const { data, isError, hasNextPage, fetchNextPage } = useGetBookingList(value);

  const bookings = useMemo(
    () => data?.pages.reduce((acc, page) => [...acc, ...page.data], [] as BookType[]),
    [data]
  );

  const handleNextPage = useCallback(() => fetchNextPage(), [fetchNextPage]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: STATUS) => {
    event.preventDefault();
    setValue(newValue);
  };

  const renderAccommodationSkeleton = useCallback(
    () => (
      <Box display="grid" gap={8} gridTemplateColumns={'repeat(auto-fill, minmax(280px, 1fr))'}>
        <AccommodationSkeleton />;
      </Box>
    ),
    []
  );

  if (isError) {
    return <DataFetchError errorKey={ErrorTypes.accommodation_failed_to_get_list} />;
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" my={4}>
        <Typography variant={'lg'} fontWeight={600}>
          Your Bookings
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
          {a11yProps.map((props, index) => (
            <Tab key={index} {...props} />
          ))}
        </Tabs>
      </Box>
      <Box pt={2}>
        {bookings?.length === 0 ? (
          <Typography textAlign={'center'} variant={'h6'} mt={8}>
            You haven&apos;t booked any accommodations yet
          </Typography>
        ) : (
          <InfiniteScroll
            next={handleNextPage}
            hasMore={hasNextPage}
            dataLength={bookings?.length || 0}
            loader={renderAccommodationSkeleton()}
          >
            <Box
              display="grid"
              gap={8}
              gridTemplateColumns={'repeat(auto-fill, minmax(280px, 1fr))'}
            >
              {bookings?.map(
                ({ id, accommodation, accommodationId, startDate, endDate, status }) => (
                  <BookingCard
                    key={id}
                    id={id}
                    accommodation={accommodation}
                    accommodationId={accommodationId}
                    startDate={startDate}
                    endDate={endDate}
                    status={status as STATUS}
                  />
                )
              )}
            </Box>
          </InfiniteScroll>
        )}
      </Box>
    </Box>
  );
}
