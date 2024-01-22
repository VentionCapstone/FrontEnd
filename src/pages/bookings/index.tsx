import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useGetBookingList } from '@src/api/queries/booking/useGetBookingList';
import CustomImage from '@src/components/shared/CustomImage';
import DataFetchError from '@src/components/shared/DataFetchError';
import { BookType } from '@src/types/booking.types';
import { STATUS } from '@src/types/global.types';
import { ErrorTypes } from '@src/types/i18n.types';
import { lineClampStyle } from '@src/utils';
import AccommodationSkeleton from '../accommodations/AccommodationSkeleton';
import BookingModal, { DetailsProps } from './BookingModal';

function a11yProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Bookings() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<DetailsProps>({
    id: '',
    title: '',
    price: 0,
    accommodationId: '',
    thumbnailUrl: '',
    previewImgUrl: '',
    startDate: '',
    endDate: '',
    status: 'PENDING',
  });
  const [value, setValue] = useState<STATUS>('PENDING');

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useGetBookingList(value);

  const bookings = useMemo(
    () => data?.pages.reduce((acc, page) => [...acc, ...page.data], [] as BookType[]),
    [data]
  );

  const handleNextPage = useCallback(() => fetchNextPage(), [fetchNextPage]);

  const handleClick = useCallback((details: DetailsProps) => {
    setOpen(true);
    setDetails(details);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

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

  if (isPending) {
    renderAccommodationSkeleton();
  }
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
          <Tab label="Pending" value="PENDING" {...a11yProps(0)} />
          <Tab label="Active" value="ACTIVE" {...a11yProps(1)} />
          <Tab label="Completed" value="COMPLETED" {...a11yProps(2)} />
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
                  <Box
                    gap={2}
                    key={id}
                    display="flex"
                    flexDirection="column"
                    onClick={() => {
                      handleClick({
                        id,
                        endDate,
                        startDate,
                        accommodationId,
                        status: status as STATUS,
                        title: accommodation.title,
                        price: accommodation.price,
                        thumbnailUrl: accommodation.thumbnailUrl,
                        previewImgUrl: accommodation.previewImgUrl,
                      });
                    }}
                  >
                    <Box width="100%" borderRadius={2} overflow="hidden" position="relative">
                      <CustomImage
                        name={`${id} thumbnail`}
                        image={accommodation.thumbnailUrl || accommodation.previewImgUrl}
                      />
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="body1" sx={lineClampStyle(1)}>
                        {accommodation.title}
                      </Typography>
                      <Typography variant="body1" color="secondary2.main">
                        {status}
                      </Typography>
                    </Box>
                  </Box>
                )
              )}
              {open && <BookingModal open={open} handleClose={handleClose} details={details} />}
            </Box>
          </InfiniteScroll>
        )}
      </Box>
    </Box>
  );
}
