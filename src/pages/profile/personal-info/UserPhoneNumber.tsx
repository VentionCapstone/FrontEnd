import { Button, Stack, TextField, Typography } from '@mui/material';

export const PhoneNumber = ({ collapsePanel }: { collapsePanel: () => void }) => {
  return (
    <>
      <Typography variant={'sm'} color={'darkGrey.main'}>
        Add a number so confirmed guests and Airbnb can get in touch. You can add other numbers and
        choose how they’re used.
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
