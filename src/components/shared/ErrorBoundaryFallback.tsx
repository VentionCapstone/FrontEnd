import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ROUTES } from '@src/config/routes.config';
import { Link } from 'react-router-dom';

function ErrorBoundaryFallback() {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box
      sx={{
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'center',
        'textAlign': 'center',
        'height': '100vh',
        'width': '100vw',
        '& a': {
          color: 'inherit',
          fontSize: { xs: '1rem', md: '1.5rem' },
          fontWeight: 600,
        },
      }}
    >
      <Typography variant={mobileScreen ? 'body1' : 'lg'}>
        Sorry, something went wrong. Please try again later.
      </Typography>
      <Link to={ROUTES.root}>Go back to home page</Link>
    </Box>
  );
}

export default ErrorBoundaryFallback;
