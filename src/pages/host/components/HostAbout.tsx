import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LanguageIcon from '@mui/icons-material/Language';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, List, ListItem, Typography } from '@mui/material';
import { DATE_MONTH_YEAR_FORMAT } from '@src/constants';
import { FONT_SIZES } from '@src/theme/themeTokens';
import { HostProfile } from '@src/types/hostProfile.types';
import * as dayjs from 'dayjs';

function HostAbout({ host }: { host: HostProfile }) {
  const { firstName, joinedAt, language, country, description } = host;

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
        About {firstName}
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
          <Typography variant="subtitle1" fontSize={FONT_SIZES.md} fontWeight="500" ml={3}>
            Joined in {dayjs(joinedAt).format(DATE_MONTH_YEAR_FORMAT)}
          </Typography>
        </ListItem>
        <ListItem>
          <LanguageIcon />
          <Typography variant="subtitle1" fontSize={FONT_SIZES.md} fontWeight="500" ml={3}>
            Speaks in {language}
          </Typography>
        </ListItem>
        <ListItem>
          <FmdGoodIcon />
          <Typography variant="subtitle1" fontSize={FONT_SIZES.md} fontWeight="500" ml={3}>
            Lives in {country}
          </Typography>
        </ListItem>
      </List>
      <Typography variant="body1" fontSize={FONT_SIZES.md} fontWeight="500" px={2}>
        {description}
      </Typography>
    </Box>
  );
}

export default HostAbout;
