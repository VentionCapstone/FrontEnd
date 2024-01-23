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
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { ReviewModal as ReviewModalTr } from '../../types/i18n.types';

type ReviewModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  bookingId: string;
  accommodationId: string;
};

function ReviewModal({ open, setOpen, bookingId, accommodationId }: ReviewModalProps) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { mutate, isSuccess } = useCreateReviewMutation(accommodationId, bookingId);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(() => {
    mutate({ rating, feedback });
    setOpen(false);
  }, [setOpen, mutate, rating, feedback]);

  if (isSuccess) {
    toast.success(t(ReviewModalTr.success));
    setOpen(false);
    setRating(0);
    setFeedback('');
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t(ReviewModalTr.title)}</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center' }}
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
