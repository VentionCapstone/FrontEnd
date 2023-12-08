import { Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type FullNameProps = {
  collapsePanel: () => void;
  userFirstName: string;
  userLastName: string;
};

export const FullName = ({ collapsePanel, userFirstName, userLastName }: FullNameProps) => {
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFirstName('');
    setLastName('');

    collapsePanel();
  };

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'}>
        This is the name on your travel document, which could be a license or a passport.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack rowGap={2} columnGap={4} my={4} direction={{ md: 'row' }}>
          <TextField
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            fullWidth
            size="small"
            label="First name"
          />
          <TextField
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            fullWidth
            size="small"
            label="Last name"
          />
        </Stack>

        <Button type="submit" variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
          Save
        </Button>
      </form>
    </>
  );
};
