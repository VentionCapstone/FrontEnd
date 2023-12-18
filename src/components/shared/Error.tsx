import { Box, Typography } from '@mui/material';

function Error({
  error = 'Something went wrong',
  position = 'center',
}: {
  error?: string;
  position?: 'start' | 'center' | 'end';
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: position,
        alignItems: 'center',
      }}
    >
      <Typography>{error}</Typography>
    </Box>
  );
}

export default Error;
