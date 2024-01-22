import { Box, CircularProgress } from '@mui/material';

function LoadingPrimary({ height = '100vh' }: { height?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
      }}
    >
      <CircularProgress sx={{ color: '#FF385C' }} variant="indeterminate" />
    </Box>
  );
}

export default LoadingPrimary;
