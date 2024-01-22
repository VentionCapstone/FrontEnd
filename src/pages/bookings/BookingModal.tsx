import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import CustomImage from '@src/components/shared/CustomImage';
import { STATUS } from '@src/types/global.types';
import { lineClampStyle } from '@src/utils';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

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
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={lineClampStyle(1)}
          mb={2}
        >
          {details.title}
        </Typography>
        <Box width="100%" borderRadius={2} overflow="hidden" position="relative">
          <CustomImage
            image={details.thumbnailUrl || details.previewImgUrl}
            name={`${details.accommodationId} thumbnail`}
          />
        </Box>
        <Box display="flex" mt={4} mb={2} alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="sm" fontWeight="700">
              Check-in
            </Typography>
            <Typography variant="sm">{startDate.format('DD/MM/YYYY')}</Typography>
          </Box>
          <Box>
            <Typography variant="sm" fontWeight="700">
              Check-out
            </Typography>
            <Typography variant="sm">{endDate.format('DD/MM/YYYY')}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" mt={2} justifyContent="space-between">
          <Typography variant="sm" fontWeight="700">
            Total
          </Typography>
          <Typography fontWeight="700">${details.price * diff}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={2} justifyContent="space-between">
          <Typography variant="sm" fontWeight="700">
            Status
          </Typography>
          <Typography variant="sm" color="secondary2.main">
            {details.status}
          </Typography>
        </Box>
        {details.status === 'PENDING' && (
          <Box width="100%" display="flex" justifyContent="flex-end" mt={2} onClick={handlePay}>
            <Button fullWidth variant="contained" color="primary">
              <Typography variant="sm" fontWeight="700" color="white">
                Pay now
              </Typography>
            </Button>
          </Box>
        )}
        {details.status === 'COMPLETED' && (
          <Box width="100%" display="flex" justifyContent="flex-end" mt={2}>
            <Button fullWidth variant="contained" color="primary">
              <Typography variant="sm" fontWeight="700" color="white">
                Add review
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
