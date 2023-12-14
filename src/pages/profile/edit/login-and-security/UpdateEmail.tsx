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
    if (email && email !== userEmail) mutate();

    collapsePanel();
  };

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
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
        sx={{ display: 'block', maxWidth: '40rem', mt: { xs: 2, md: 4 }, mb: 6 }}
      />

      <Button onClick={handleSubmit} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Change
      </Button>
    </>
  );
};
