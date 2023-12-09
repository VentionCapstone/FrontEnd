import { CircularProgress, Box } from '@mui/material';

function LoadingPrimary() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress color="error" variant="indeterminate" />
    </Box>
  );
}

export default LoadingPrimary;
