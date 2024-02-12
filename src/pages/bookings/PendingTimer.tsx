import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import { PRIMARY_DARK_THEME } from '@src/theme/themeTokens';
import { PendingTimer as TimerEnum } from '@src/types/i18n.types';

const PendingTimer = ({ remainingTime }: { remainingTime: number | null }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        py: 2,
        px: 4,
        bgcolor: 'rgba(20, 21, 30, 0.51)',
        color: PRIMARY_DARK_THEME,
        borderRadius: '0 0 0 0.5rem',
      }}
    >
      <Stack direction={'row'} gap={1} alignItems={'center'}>
        <AccessTimeRoundedIcon fontSize="small" />

        <Typography variant="sm" color={PRIMARY_DARK_THEME}>
          {remainingTime}
          <Typography variant="sm" component={'span'} color={PRIMARY_DARK_THEME} ml={0.25}>
            {t(TimerEnum.minutes)}
          </Typography>
        </Typography>
      </Stack>
    </Box>
  );
};

export default PendingTimer;
