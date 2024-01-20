import { Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import useEditAccountMutation from '@src/api/mutations/account/useEditAccountMutation';
import { useAppSelector } from '@src/hooks/redux-hooks';
import i18n from '@src/i18n/i18n';
import { getProfile } from '@src/stores/slices/authSlice';
import { AccountEditPersonalInfo } from '@src/types/i18n.types';
import { User } from '@src/types/user.types';

type FullNameProps = {
  collapsePanel: () => void;
  initialFirstName: User['firstName'] | undefined;
  initialLastName: User['lastName'] | undefined;
};

const FullName = ({ collapsePanel, initialFirstName, initialLastName }: FullNameProps) => {
  const profileId = useAppSelector(getProfile)?.id ?? '';
  const { mutate } = useEditAccountMutation(profileId);

  const [firstName, setFirstName] = useState(initialFirstName ?? '');
  const [lastName, setLastName] = useState(initialLastName ?? '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (firstName && lastName) {
      mutate({ firstName, lastName });
    }

    collapsePanel();
  };

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        {i18n.t(AccountEditPersonalInfo.legal_name_desc)}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} mt={{ xs: 2, md: 4 }} mb={6}>
          <Grid item xs={12} lg={6}>
            <TextField
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              fullWidth
              size="small"
              label="First name"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
              fullWidth
              size="small"
              label="Last name"
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant={'contained'}
          size="small"
          sx={{ display: 'block', fontWeight: 600, ml: 'auto' }}
        >
          {i18n.t(AccountEditPersonalInfo.save_name)}
        </Button>
      </form>
    </>
  );
};

export default FullName;
