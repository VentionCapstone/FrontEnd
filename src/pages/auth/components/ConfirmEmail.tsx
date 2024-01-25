import DoneIcon from '@mui/icons-material/Done';
import { Box, IconButton, Link, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ROUTES } from '@src/config/routes.config';
import { Link as RouterLink } from 'react-router-dom';
import { confirmEmailSyles } from './styles';

function ConfirmEmail() {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={confirmEmailSyles.container}>
      <Box sx={confirmEmailSyles.box}>
        <IconButton sx={confirmEmailSyles.iconButton}>
          <DoneIcon sx={confirmEmailSyles.icon} />
        </IconButton>
        <Typography variant={mobileScreen ? 'h6' : 'xl'} textAlign="center" fontWeight={700} mb={4}>
          Check your email
        </Typography>
        <Typography variant={mobileScreen ? 'sm' : 'body1'} sx={confirmEmailSyles.description}>
          You should receive an email with a link to confirm your email address.
        </Typography>
        <Link
          component={RouterLink}
          to={ROUTES.auth.signUp}
          color={'secondary2.main'}
          sx={confirmEmailSyles.link}
        >
          Return to sign up
        </Link>
      </Box>
    </Box>
  );
}

export default ConfirmEmail;
