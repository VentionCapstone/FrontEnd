import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LanguageIcon from '@mui/icons-material/Language';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, List, ListItem, Typography } from '@mui/material';
import { HostProfile } from '@src/types/hostProfile.types';
import * as dayjs from 'dayjs';

function HostAbout({ host }: { host: HostProfile }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        pb: '2.5rem',
      }}
    >
      <Typography variant="h3" fontSize="2rem" fontWeight="800">
        About {host.firstName}
      </Typography>
      <List
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
          },
          gap: '0.5rem',
        }}
      >
        <ListItem>
          <PersonAddIcon />
          <Typography variant="subtitle1" fontSize="1.2rem" fontWeight="500" ml={3}>
            Joined in {dayjs(host.joinedAt).format('MMMM YYYY')}
          </Typography>
        </ListItem>
        <ListItem>
          <LanguageIcon />
          <Typography variant="subtitle1" fontSize="1.2rem" fontWeight="500" ml={3}>
            Speaks in {host.language}
          </Typography>
        </ListItem>
        <ListItem>
          <FmdGoodIcon />
          <Typography variant="subtitle1" fontSize="1.2rem" fontWeight="500" ml={3}>
            Lives in {host.country}
          </Typography>
        </ListItem>
      </List>
      <Typography variant="body1" fontSize="1.2rem" fontWeight="500" px={2}>
        {host.description}
      </Typography>
    </Box>
  );
}

export default HostAbout;
