import { Box, CircularProgress } from '@mui/material';
import { SECONDARY_MAIN } from '@src/theme/themeTokens';

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
      <CircularProgress sx={{ color: SECONDARY_MAIN }} variant="indeterminate" />
    </Box>
  );
}

export default LoadingPrimary;
