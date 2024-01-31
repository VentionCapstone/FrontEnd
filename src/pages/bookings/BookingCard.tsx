import { Box, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';

import CustomImage from '@src/components/shared/CustomImage';
import { Status } from '@src/types/global.types';
import { lineClampStyle } from '@src/utils';
import BookingModal from './BookingModal';

interface BookingCardProps {
  id: string;
  accommodation: {
    title: string;
    price: number;
    thumbnailUrl: string;
    previewImgUrl: string;
  };
  accommodationId: string;
  startDate: string;
  endDate: string;
  status: Status;
}

const BookingCard = React.memo(
  ({ id, accommodation, accommodationId, startDate, endDate, status }: BookingCardProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = useCallback(() => setOpen(false), []);

    return (
      <Box gap={2} display="flex" flexDirection="column">
        <Box
          width="100%"
          borderRadius={2}
          overflow="hidden"
          position="relative"
          onClick={handleOpen}
        >
          <CustomImage
            name={`${id} thumbnail`}
            image={accommodation.thumbnailUrl || accommodation.previewImgUrl}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body1" sx={lineClampStyle(1)}>
            {accommodation.title}
          </Typography>
        </Box>
        {open && (
          <BookingModal
            open={open}
            handleClose={handleClose}
            details={{
              id,
              status,
              endDate,
              startDate,
              accommodationId,
              title: accommodation.title,
              price: accommodation.price,
              thumbnailUrl: accommodation.thumbnailUrl,
              previewImgUrl: accommodation.previewImgUrl,
            }}
          />
        )}
      </Box>
    );
  }
);

export default BookingCard;

BookingCard.displayName = 'BookingCard';
