import { Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { User } from '../../../../types/profile.types';
import { useAppSelector } from '../../../../hooks/redux-hooks';
import useEditAccountMutation from '../../../../api/mutations/account/useEditAccountMutation';

type FullNameProps = {
  collapsePanel: () => void;
  initialFirstName: User['firstName'];
  initialLastName: User['lastName'];
};

const FullName = ({ collapsePanel, initialFirstName, initialLastName }: FullNameProps) => {
  const profileId = useAppSelector((state) => state.auth.user?.Profile?.id) ?? '';
  const { mutate } = useEditAccountMutation(profileId);

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);

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
        This is the name on your travel document, which could be a license or a passport.
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
          Save
        </Button>
      </form>
    </>
  );
};

export default FullName;
