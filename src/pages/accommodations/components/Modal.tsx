import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { ConfirmationModalProps } from '@src/types/accommodation.types';

export default function ConfirmationModal({ open, onClose, onConfirm }: ConfirmationModalProps) {
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
          Are you sure you want to delete this accommodation?
        </DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>No</Button>
          <Button autoFocus onClick={onConfirm}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
