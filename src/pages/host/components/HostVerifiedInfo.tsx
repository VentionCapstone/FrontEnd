import { Box } from '@mui/system';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { HostProfile } from '@src/types/hostProfile.types';

function HostVerifiedInfo({ host }: { host: HostProfile }) {
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
        {host.firstName}&apos;s confirmed information
      </Typography>
      <List disablePadding>
        <ListItem>
          <ListItemIcon>{host.isVerified ? <CheckIcon /> : <CloseIcon />}</ListItemIcon>
          <Typography fontSize="1.2rem">Identity</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>{host.isEmailVerified ? <CheckIcon /> : <CloseIcon />}</ListItemIcon>
          <Typography fontSize="1.2rem">Email address</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <Typography fontSize="1.2rem">Phone number</Typography>
        </ListItem>
      </List>
    </Box>
  );
}

export default HostVerifiedInfo;
