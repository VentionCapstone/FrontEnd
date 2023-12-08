import { Box, Button, InputLabel, Stack, TextField } from '@mui/material';
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
    <Stack gap={4} maxWidth={'40rem'} mt={3}>
      <Box>
        <InputLabel htmlFor="user-pass-updata-current">Current password</InputLabel>
        <TextField
          value={passwords.currentPass}
          onChange={handleChange}
          fullWidth
          required
          type={'password'}
          size="small"
          name="currentPass"
        />
      </Box>

      <Box>
        <InputLabel htmlFor="user-pass-updata-new">New password</InputLabel>
        <TextField
          value={passwords.newPass}
          onChange={handleChange}
          fullWidth
          required
          type={'password'}
          size="small"
          name="newPass"
        />
      </Box>

      <Box>
        <InputLabel htmlFor="user-pass-updata-confirm">Confirm password</InputLabel>
        <TextField
          value={passwords.confirmPass}
          onChange={handleChange}
          fullWidth
          required
          type={'password'}
          size="small"
          name="confirmPass"
        />
      </Box>

      <Button
        onClick={collapsePanel}
        variant={'contained'}
        size="small"
        sx={{ fontWeight: 600, mr: 'auto', mt: 3 }}
      >
        Change
      </Button>
    </Stack>
  );
};
