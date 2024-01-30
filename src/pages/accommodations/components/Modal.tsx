import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { ConfirmationModalProps } from '@src/types/accommodation.types';
import { EditAccommodation } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';

export default function ConfirmationModal({ open, onClose, onConfirm }: ConfirmationModalProps) {
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            mb: -5,
          }}
        >
          {t(EditAccommodation.AreYouSureDel)}
        </DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>{t(EditAccommodation.No)}</Button>
          <Button autoFocus onClick={onConfirm}>
            {t(EditAccommodation.Yes)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
