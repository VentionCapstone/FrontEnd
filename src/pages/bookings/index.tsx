import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

import { useGetBookingList } from '@src/api/queries/booking/useGetBookingList';
import DataFetchError from '@src/components/shared/DataFetchError';
import { STATUSES } from '@src/constants';
import { BookType } from '@src/types/booking.types';
import { Status } from '@src/types/global.types';
import { BookingsRoute, ErrorTypes } from '@src/types/i18n.types';
import { capitalize } from '@src/utils/capitalize';
import AccommodationSkeleton from '../accommodations/components/AccommodationSkeleton';
import { mainStyles } from '../main/index.styles';
import BookingCard from './BookingCard';

export default function Bookings() {
  const { t } = useTranslation();
  const [bookingParams, setBookingParams] = useSearchParams();
  const bookingStatus = (bookingParams.get('status') as Status) ?? Status.active;

  const { data, isError, hasNextPage, fetchNextPage, isFetching } =
    useGetBookingList(bookingStatus);

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

  const bookings = useMemo(
    () => data?.pages.reduce((acc, page) => [...acc, ...page.data], [] as BookType[]),
    [data]
  );

  const handleNextPage = useCallback(() => fetchNextPage(), [fetchNextPage]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: Status) => {
    event.preventDefault();
    setBookingParams({ status: newValue });
  };

  if (isError) {
    return <DataFetchError errorKey={ErrorTypes.accommodation_failed_to_get_list} />;
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" my={4}>
        <Typography variant={'lg'} fontWeight={600}>
          {t(BookingsRoute.title)}
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={bookingStatus} onChange={handleTabChange} aria-label="basic tabs example">
          {a11yProps.map((props, index) => (
            <Tab key={index} {...props} />
          ))}
        </Tabs>
      </Box>
      <Box pt={2}>
        {isFetching && <AccommodationSkeleton />}

        {bookings?.length === 0 ? (
          <Typography textAlign={'center'} variant={'h6'} mt={8}>
            {t(BookingsRoute.desc_not_booked)}
          </Typography>
        ) : (
          <InfiniteScroll
            next={handleNextPage}
            hasMore={hasNextPage}
            dataLength={bookings?.length || 0}
            loader={<AccommodationSkeleton />}
          >
            <Box sx={mainStyles.accommmodationCard}>
              {bookings?.map(
                ({ id, accommodation, accommodationId, startDate, endDate, status }) => (
                  <BookingCard
                    key={id}
                    id={id}
                    accommodation={accommodation}
                    accommodationId={accommodationId}
                    startDate={startDate}
                    endDate={endDate}
                    status={status as Status}
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
