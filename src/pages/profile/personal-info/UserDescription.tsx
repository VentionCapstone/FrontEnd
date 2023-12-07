import { Box, Button, TextField, Typography } from '@mui/material';

export const Description = ({ collapsePanel }: { collapsePanel: () => void }) => {
  return (
    <>
      <Typography variant={'sm'} color={'darkGrey.main'}>
        Tell us a little bit about yourself, so your future hosts or guests can get to know you.
      </Typography>

      <Box my={4}>
        <TextField
          id="standard-multiline-flexible"
          multiline
          minRows={2}
          maxRows={6}
          fullWidth
          sx={{ maxWidth: '40rem' }}
        />
      </Box>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Save
      </Button>
    </>
  );
};
