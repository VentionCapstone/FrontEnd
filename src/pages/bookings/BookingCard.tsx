import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

import { accommodationCardStyles } from '@src/components/card/acccommodationCard/accommodationCard.styles';
import CustomImage from '@src/components/shared/CustomImage';
import { Status } from '@src/types/global.types';
import { lineClampStyle } from '@src/utils';
import BookingModal from './BookingModal';
import PendingTimer from './PendingTimer';

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
  createdAt: string;
  status: Status;
}

const BookingCard = React.memo(
  ({
    id,
    accommodation,
    accommodationId,
    startDate,
    endDate,
    status,
    createdAt,
  }: BookingCardProps) => {
    const [open, setOpen] = useState(false);
    const [remainingTime, setRemainingTime] = useState<number | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = useCallback(() => setOpen(false), []);

    useEffect(() => {
      if (status === Status.pending) {
        const calculateDifference = () => {
          const deadlineTime = dayjs(createdAt).add(60, 'minute');
          const difference = Math.ceil(deadlineTime.diff(dayjs(), 'minutes', true));
          setRemainingTime(difference);
        };

        calculateDifference();
        const intervalId = setInterval(calculateDifference, 60000);

        return () => clearInterval(intervalId);
      }
    }, [createdAt, status]);

    if (status === Status.pending && (!remainingTime || remainingTime <= 0)) return null;

    return (
      <Box sx={accommodationCardStyles.root}>
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

          {status === Status.pending && <PendingTimer remainingTime={remainingTime} />}
        </Box>

        <Typography sx={lineClampStyle(1)} mt={2}>
          {accommodation.title}
        </Typography>

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
