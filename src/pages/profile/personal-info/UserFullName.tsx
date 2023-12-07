import { Button, Stack, TextField, Typography } from '@mui/material';

export const FullName = ({ collapsePanel }: { collapsePanel: () => void }) => {
  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'}>
        This is the name on your travel document, which could be a license or a passport.
      </Typography>

      <Stack rowGap={2} columnGap={4} my={4} direction={{ md: 'row' }}>
        <TextField fullWidth size="small" label="First name" name="firstname-update" />
        <TextField fullWidth size="small" label="Last name" name="lastname-update" />
      </Stack>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Save
      </Button>
    </>
  );
};
