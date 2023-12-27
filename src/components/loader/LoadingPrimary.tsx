import { CircularProgress, Box } from '@mui/material';

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
      <CircularProgress color="error" variant="indeterminate" />
    </Box>
  );
}

export default LoadingPrimary;
