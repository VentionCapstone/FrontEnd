import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from '@mui/material';
import { useCreateReviewMutation } from '@src/api/mutations/review/useCreateReviewMutation';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { ReviewModal as ReviewModalTr } from '../../types/i18n.types';

type ReviewModalProps = {
  open: boolean;
  handleClose: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  bookingId: string;
  accommodationId: string;
};

function ReviewModal({ open, handleClose, bookingId, accommodationId, setOpen }: ReviewModalProps) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { mutate, isSuccess } = useCreateReviewMutation(accommodationId, bookingId);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(() => {
    mutate({ rating, feedback });
  }, [mutate, rating, feedback]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(t(ReviewModalTr.success));
      handleClose();
      setRating(0);
      setFeedback('');
    }
  }, [isSuccess, t, handleClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        '.MuiPaper-root': {
          borderRadius: 2,
          bgcolor: 'background.default',
        },
      }}
    >
      <DialogTitle>{t(ReviewModalTr.title)}</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'center',
        }}
      >
        <Rating
          sx={{
            '& .MuiRating-iconFilled': {
              color: 'secondary.main',
            },
          }}
          name="half-rating"
          precision={1}
          size="large"
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue as number);
          }}
        />
        <TextField
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={t(ReviewModalTr.placeholder)}
          multiline
          fullWidth
          rows={4}
          maxRows={10}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t(ReviewModalTr.cancel)}</Button>
        <Button autoFocus onClick={onConfirm}>
          {t(ReviewModalTr.submit)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReviewModal;
