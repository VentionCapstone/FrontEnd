import { Button, TextField, Typography } from '@mui/material';

export const UpdateEmail = ({ collapsePanel }: { collapsePanel: () => void }) => {
  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'}>
        Type your new email address
      </Typography>

      <TextField
        fullWidth
        type={'email'}
        size="small"
        label="email"
        name="email-update"
        sx={{ display: 'block', maxWidth: '40rem', my: '1rem' }}
      />

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Change
      </Button>
    </>
  );
};
