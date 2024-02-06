import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { ROUTES } from '@src/config/routes.config';
import { DATE_MONTH_YEAR_FORMAT } from '@src/constants';
import { Owner } from '@src/types/accommodation.types';
import { OwnerCardInfo } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';

function OwnerCard({ owner }: { owner: Owner }) {
  const { t } = useTranslation();
  const { id, firstName, lastName, createdAt, profile, isVerified } = owner;

  return (
    <Box
      sx={{
        maxWidth: '400px',
        width: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'secondary2.light',
        p: {
          xs: 4,
          md: 6,
        },
        boxShadow: 3,
      }}
    >
      <Typography variant="h6">{t(OwnerCardInfo.title)}</Typography>

      <Link to={ROUTES.host.details(id)} style={{ textDecoration: 'none' }}>
        <Box display="flex" alignItems="center" mt={3} gap={2}>
          <Box sx={{ position: 'relative', flexShrink: 0 }}>
            <Box
              component={'img'}
              src={profile.imageUrl}
              alt={firstName}
              sx={{
                width: '4rem',
                height: '4rem',
                bgcolor: 'secondary2.light',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />

            {isVerified && (
              <Box
                component={VerifiedIcon}
                sx={{
                  position: 'absolute',
                  right: -5,
                  bottom: -5,
                  width: '1.5rem',
                  height: '1.5rem',
                  color: 'secondary.main',
                  stroke: '#fff',
                }}
              />
            )}
          </Box>
          <Box ml={2}>
            <Typography fontWeight={600} variant="h6">{`${firstName} ${lastName}`}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t(OwnerCardInfo.joined)} {dayjs(createdAt).format(DATE_MONTH_YEAR_FORMAT)} ·{' '}
              {profile.country}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}

export default OwnerCard;
