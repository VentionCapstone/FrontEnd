import { Box } from '@mui/system';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { FONT_SIZES } from '@src/theme/themeTokens';
import { HostProfile } from '@src/types/hostProfile.types';
import { HostInfo } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';

function HostVerifiedInfo({ host }: { host: HostProfile }) {
  const { t } = useTranslation();
  const { firstName, isVerified, isEmailVerified } = host;

  return (
    <Box
      sx={{
        flex: '1',
        borderRadius: 5,
        border: '1px solid #b0b0b0',
        p: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <Typography variant="h3" fontWeight="700" fontSize="1.4rem">
        {t(HostInfo.host_verified_title, { firstName })}
      </Typography>
      <List disablePadding>
        <ListItem>
          <ListItemIcon>{isVerified ? <CheckIcon /> : <CloseIcon />}</ListItemIcon>
          <Typography fontSize={FONT_SIZES.md}>{t(HostInfo.host_verified_identity)}</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>{isEmailVerified ? <CheckIcon /> : <CloseIcon />}</ListItemIcon>
          <Typography fontSize={FONT_SIZES.md}>{t(HostInfo.host_verified_email)}</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <Typography fontSize={FONT_SIZES.md}>{t(HostInfo.host_verified_phone)}</Typography>
        </ListItem>
      </List>
    </Box>
  );
}

export default HostVerifiedInfo;
