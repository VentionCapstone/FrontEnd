import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export const UpdateEmail = ({
  collapsePanel,
  userEmail,
}: {
  collapsePanel: () => void;
  userEmail: string;
}) => {
  const [email, setEmail] = useState(userEmail);
  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'}>
        Type your new email address
      </Typography>

      <TextField
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
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
