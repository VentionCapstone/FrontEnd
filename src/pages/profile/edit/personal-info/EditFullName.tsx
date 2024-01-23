import { Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import useEditAccountMutation from '@src/api/mutations/account/useEditAccountMutation';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { getProfile } from '@src/stores/slices/authSlice';
import { AccountEditPersonalInfo } from '@src/types/i18n.types';
import { User } from '@src/types/user.types';
import { useTranslation } from 'react-i18next';

type FullNameProps = {
  collapsePanel: () => void;
  initialFirstName: User['firstName'] | undefined;
  initialLastName: User['lastName'] | undefined;
};

const FullName = ({ collapsePanel, initialFirstName, initialLastName }: FullNameProps) => {
  const { t } = useTranslation();
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
        {t(AccountEditPersonalInfo.legal_name_desc)}
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
              label={t(AccountEditPersonalInfo.first_name)}
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
              label={t(AccountEditPersonalInfo.last_name)}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant={'contained'}
          size="small"
          sx={{ display: 'block', fontWeight: 600, ml: 'auto' }}
        >
          {t(AccountEditPersonalInfo.save_name)}
        </Button>
      </form>
    </>
  );
};

export default FullName;
