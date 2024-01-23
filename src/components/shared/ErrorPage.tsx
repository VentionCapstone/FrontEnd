import { Box, Typography } from '@mui/material';
import { ROUTES } from '@src/config/routes.config';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <Box
      sx={{
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'center',
        'height': '100vh',
        'width': '100vw',
        '& a': {
          color: 'inherit',
          fontSize: '1.2rem',
          fontWeight: 600,
        },
      }}
    >
      <Typography variant="lg">Sorry, something went wrong. Please try again later.</Typography>
      <Link to={ROUTES.root}>Go back to home page</Link>
    </Box>
  );
}

export default ErrorPage;
