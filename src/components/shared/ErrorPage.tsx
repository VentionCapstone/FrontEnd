import { Box, Typography } from '@mui/material';

function ErrorPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Typography variant="lg">Sorry, something went wrong. Please try again later.</Typography>
    </Box>
  );
}

export default ErrorPage;
