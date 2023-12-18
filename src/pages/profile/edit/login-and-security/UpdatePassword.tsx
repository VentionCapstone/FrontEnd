import { Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

export const UpdatePassword = ({ collapsePanel }: { collapsePanel: () => void }) => {
  const [passwords, setPasswords] = useState({
    currentPass: '',
    newPass: '',
    confirmPass: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setPasswords({ ...passwords, [name]: value });
  };

  return (
    <>
      <Stack gap={4} mt={3} mb={6} maxWidth={'40rem'}>
        <TextField
          value={passwords.currentPass}
          onChange={handleChange}
          fullWidth
          required
          label={'Current password'}
          type={'password'}
          size="small"
          name="currentPass"
        />

        <TextField
          value={passwords.newPass}
          onChange={handleChange}
          fullWidth
          required
          label={'New password'}
          type={'password'}
          size="small"
          name="newPass"
        />

        <TextField
          value={passwords.confirmPass}
          onChange={handleChange}
          fullWidth
          required
          label={'Confirm password'}
          type={'password'}
          size="small"
          name="confirmPass"
        />
      </Stack>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Change
      </Button>
    </>
  );
};
