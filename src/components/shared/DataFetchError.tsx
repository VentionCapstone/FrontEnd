import { Box, Typography } from '@mui/material';

function DataFetchError({
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
        height: '50vh',
      }}
    >
      <Typography color="error">{error}</Typography>
    </Box>
  );
}

export default DataFetchError;
