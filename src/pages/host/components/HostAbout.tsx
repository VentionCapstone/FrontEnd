import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LanguageIcon from '@mui/icons-material/Language';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { DATE_MONTH_YEAR_FORMAT } from '@src/constants';
import { HostProfile } from '@src/types/hostProfile.types';
import { HostInfo } from '@src/types/i18n.types';

function HostAbout({ host }: { host: HostProfile }) {
  const { t } = useTranslation();
  const { firstName, joinedAt, language, country, description } = host;

  return (
    <Box>
      <Typography fontSize="2rem" fontWeight="600">
        {t(HostInfo.host_about_title, { firstName })}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
          },
          rowGap: 2,
          columnGap: 4,
          color: 'secondary2.main',
          px: 4,
          my: 4,
        }}
      >
        <Stack direction={'row'} gap={2}>
          <PersonAddIcon fontSize="small" />
          <Typography>
            {t(HostInfo.host_about_joined, {
              joinedAt: dayjs(joinedAt).format(DATE_MONTH_YEAR_FORMAT),
            })}
          </Typography>
        </Stack>

        <Stack direction={'row'} gap={2}>
          <LanguageIcon fontSize="small" />
          <Typography>{t(HostInfo.host_about_language, { language })}</Typography>
        </Stack>

        <Stack direction={'row'} gap={2}>
          <FmdGoodIcon fontSize="small" />
          <Typography>{t(HostInfo.host_about_lives_in, { country })}</Typography>
        </Stack>
      </Box>

      <Typography>{description}</Typography>
    </Box>
  );
}

export default HostAbout;
