import { Button, TextField, Typography } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';

import useUpdateEmailMutation from '@src/api/mutations/account/useUpdateEmailMutation';
import i18n from '@src/i18n/i18n';
import { LoginAndSecurityInfo } from '@src/types/i18n.types';

export const UpdateEmail = ({
  collapsePanel,
  userEmail,
}: {
  collapsePanel: () => void;
  userEmail: string;
}) => {
  const [email, setEmail] = useState(userEmail);
  const { mutate } = useUpdateEmailMutation(email);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = () => {
    if (email && email !== userEmail) mutate();

    collapsePanel();
  };

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        {i18n.t(LoginAndSecurityInfo.email_desc)}
      </Typography>

      <TextField
        value={email}
        onChange={handleChange}
        fullWidth
        type={'email'}
        size="small"
        label="email"
        sx={{ display: 'block', maxWidth: '40rem', mt: { xs: 2, md: 4 }, mb: 6 }}
      />

      <Button onClick={handleSubmit} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        {i18n.t(LoginAndSecurityInfo.email_change_btn)}
      </Button>
    </>
  );
};
