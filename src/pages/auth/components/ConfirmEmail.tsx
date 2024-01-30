import DoneIcon from '@mui/icons-material/Done';
import { Box, IconButton, Link, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ROUTES } from '@src/config/routes.config';
import { HomeUIInfo } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { confirmEmailSyles } from './styles';

function ConfirmEmail() {
  const { t } = useTranslation();
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={confirmEmailSyles.container}>
      <Box sx={confirmEmailSyles.box}>
        <IconButton sx={confirmEmailSyles.iconButton}>
          <DoneIcon sx={confirmEmailSyles.icon} />
        </IconButton>
        <Typography variant={mobileScreen ? 'h6' : 'xl'} textAlign="center" fontWeight={700} mb={4}>
          {t(HomeUIInfo.check_email)}
        </Typography>
        <Typography variant={mobileScreen ? 'sm' : 'body1'} sx={confirmEmailSyles.description}>
          {t(HomeUIInfo.check_desc)}
        </Typography>
        <Link
          component={RouterLink}
          to={ROUTES.auth.signUp}
          color={'secondary2.main'}
          sx={confirmEmailSyles.link}
        >
          {t(HomeUIInfo.return)}
        </Link>
      </Box>
    </Box>
  );
}

export default ConfirmEmail;
