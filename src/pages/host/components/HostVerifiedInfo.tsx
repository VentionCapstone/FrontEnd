import { Box } from '@mui/system';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { HostProfile } from '@src/types/hostProfile.types';
import { HostInfo } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';

function HostVerifiedInfo({ host }: { host: HostProfile }) {
  const { t } = useTranslation();
  const { firstName, isVerified, isEmailVerified } = host;

  return (
    <Box
      sx={{
        p: 6,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'secondary2.light',
      }}
    >
      <Typography fontWeight={600} mb={4}>
        {t(HostInfo.host_verified_title, { firstName })}
      </Typography>

      <List
        disablePadding
        sx={{
          '.MuiListItemIcon-root': {
            minWidth: 0,
            mr: 2,
          },
        }}
      >
        <ListItem>
          <ListItemIcon>
            {isVerified ? <CheckIcon sx={{ color: 'success.light' }} /> : <CloseIcon />}
          </ListItemIcon>
          <Typography variant="sm">{t(HostInfo.host_verified_identity)}</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {isEmailVerified ? <CheckIcon sx={{ color: 'success.light' }} /> : <CloseIcon />}
          </ListItemIcon>
          <Typography variant="sm">{t(HostInfo.host_verified_email)}</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <Typography variant="sm">{t(HostInfo.host_verified_phone)}</Typography>
        </ListItem>
      </List>
    </Box>
  );
}

export default HostVerifiedInfo;
