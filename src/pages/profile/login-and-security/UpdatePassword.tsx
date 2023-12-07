import { Box, Button, InputLabel, Stack, TextField } from '@mui/material';

export const UpdatePassword = ({ collapsePanel }: { collapsePanel: () => void }) => {
  return (
    <Stack gap={4} maxWidth={'40rem'} mt={3}>
      <Box>
        <InputLabel htmlFor="user-pass-updata-current">Current password</InputLabel>
        <TextField
          fullWidth
          required
          type={'password'}
          size="small"
          name="psw-update"
          id="user-pass-updata-current"
        />
      </Box>

      <Box>
        <InputLabel htmlFor="user-pass-updata-new">New password</InputLabel>
        <TextField
          fullWidth
          required
          type={'password'}
          size="small"
          name="psw-update"
          id="user-pass-updata-new"
        />
      </Box>

      <Box>
        <InputLabel htmlFor="user-pass-updata-confirm">Confirm password</InputLabel>
        <TextField
          fullWidth
          required
          type={'password'}
          size="small"
          name="psw-update"
          id="user-pass-updata-confirm"
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
