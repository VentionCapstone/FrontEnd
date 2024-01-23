import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LanguageIcon from '@mui/icons-material/Language';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, List, ListItem, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { DATE_MONTH_YEAR_FORMAT } from '@src/constants';
import { FONT_SIZES } from '@src/theme/themeTokens';
import { HostProfile } from '@src/types/hostProfile.types';
import { HostInfo } from '@src/types/i18n.types';

function HostAbout({ host }: { host: HostProfile }) {
  const { t } = useTranslation();
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
        {t(HostInfo.host_about_title, { firstName })}
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
            {t(HostInfo.host_about_joined, {
              joinedAt: dayjs(joinedAt).format(DATE_MONTH_YEAR_FORMAT),
            })}
          </Typography>
        </ListItem>
        <ListItem>
          <LanguageIcon />
          <Typography variant="subtitle1" fontSize={FONT_SIZES.md} fontWeight="500" ml={3}>
            {t(HostInfo.host_about_language, { language })}
          </Typography>
        </ListItem>
        <ListItem>
          <FmdGoodIcon />
          <Typography variant="subtitle1" fontSize={FONT_SIZES.md} fontWeight="500" ml={3}>
            {t(HostInfo.host_about_lives_in, { country })}
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
