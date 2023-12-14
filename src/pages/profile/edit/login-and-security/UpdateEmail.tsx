import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import useUpdateEmailMutation from '../../../../api/mutations/account/useUpdateEmailMutation';

export const UpdateEmail = ({
  collapsePanel,
  userEmail,
}: {
  collapsePanel: () => void;
  userEmail: string;
}) => {
  const [email, setEmail] = useState(userEmail);

  const { mutate } = useUpdateEmailMutation(email);

  const handleSubmit = () => {
    if (email) mutate();

    collapsePanel();
  };

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

      <Button onClick={handleSubmit} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Change
      </Button>
    </>
  );
};
