import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { Close } from '@mui/icons-material';
import ReviewModal from '@src/components/review/ReviewModal';
import CustomImage from '@src/components/shared/CustomImage';
import { STATUSES } from '@src/constants';
import { STATUS } from '@src/types/global.types';
import { BookingsRoute } from '@src/types/i18n.types';
import { lineClampStyle } from '@src/utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  p: 6,
};

export type DetailsProps = {
  id: string;
  title: string;
  price: number;
  accommodationId: string;
  thumbnailUrl: string;
  previewImgUrl: string;
  startDate: string;
  endDate: string;
  status: STATUS;
};

type Props = {
  open: boolean;
  handleClose: () => void;
  details: DetailsProps;
};

export default function BookingModal({ open, handleClose, details }: Props) {
  const { t } = useTranslation();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const navigate = useNavigate();
  const startDate = dayjs(details.startDate);
  const endDate = dayjs(details.endDate);

  const diff = endDate.diff(startDate, 'day');

  const handlePay = () => {
    navigate(
      `/book/${details.id}?accommodationId=${details.accommodationId}&startDate=${details.startDate}&endDate=${details.endDate}`
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="body1" sx={lineClampStyle(1)}>
            {details.title}
          </Typography>
          <Button onClick={handleClose}>
            <Close />
          </Button>
        </Box>
        <Box width="100%" borderRadius={2} overflow="hidden" position="relative">
          <CustomImage
            image={details.thumbnailUrl || details.previewImgUrl}
            name={`${details.accommodationId} thumbnail`}
          />
        </Box>
        <Box display="flex" mt={4} mb={2} alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="sm" fontWeight="700">
              {t(BookingsRoute.check_in)}
            </Typography>
            <Typography variant="sm">{startDate.format('DD/MM/YYYY')}</Typography>
          </Box>
          <Box>
            <Typography variant="sm" fontWeight="700">
              {t(BookingsRoute.check_out)}
            </Typography>
            <Typography variant="sm">{endDate.format('DD/MM/YYYY')}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" mt={2} justifyContent="space-between">
          <Typography variant="sm" fontWeight="700">
            {t(BookingsRoute.total)}
          </Typography>
          <Typography fontWeight="700">${details.price * diff}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={2} justifyContent="space-between">
          <Typography variant="sm" fontWeight="700">
            {t(BookingsRoute.status)}
          </Typography>
          <Typography variant="sm" color="secondary2.main">
            {details.status == 'PENDING'
              ? `${t(BookingsRoute.pending)}`
              : details.status == 'ACTIVE'
                ? `${t(BookingsRoute.active)}`
                : `${t(BookingsRoute.completed)}`}
          </Typography>
        </Box>
        {details.status === STATUSES.PENDING && (
          <Box width="100%" display="flex" justifyContent="flex-end" mt={2} onClick={handlePay}>
            <Button fullWidth variant="contained" color="primary">
              <Typography variant="sm" fontWeight="700" color="white">
                {t(BookingsRoute.pay_now)}
              </Typography>
            </Button>
          </Box>
        )}
        {details.status === STATUSES.COMPLETED && (
          <Box width="100%" display="flex" justifyContent="flex-end" mt={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setReviewModalOpen(true)}
            >
              <Typography variant="sm" fontWeight="700" color="white">
                {t(BookingsRoute.add_review)}
              </Typography>
            </Button>
          </Box>
        )}
        <ReviewModal
          open={reviewModalOpen}
          setOpen={setReviewModalOpen}
          bookingId={details.id}
          accommodationId={details.accommodationId}
        />
      </Box>
    </Modal>
  );
}
