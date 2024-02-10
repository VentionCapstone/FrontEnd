import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import { List, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

import { FONT_SIZES } from '@src/theme/themeTokens';
import { HostProfile } from '@src/types/hostProfile.types';
import { HostInfo } from '@src/types/i18n.types';

function HostProfileCard({ host }: { host: HostProfile }) {
  const { t } = useTranslation();

  const { firstName, imageUrl, isVerified, reviews, rating, accommodations } = host;

  return (
    <Box
      sx={{
        display: 'flex',
        px: 4,
        gap: '1.5rem',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'secondary2.light',
        boxShadow: 3,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={imageUrl}
            alt="profile picture"
            sx={{
              width: '6.5rem',
              height: '6.5rem',
              objectFit: 'cover',
              borderRadius: '50%',
              mb: '0.7rem',
            }}
          />
          {isVerified && (
            <Box
              component={VerifiedIcon}
              sx={{
                position: 'absolute',
                right: -4,
                bottom: 7,
                width: '2.1rem',
                height: '2.1rem',
                color: 'secondary.main',
                stroke: '#fff',
              }}
            />
          )}
        </Box>

        <Typography
          variant="xl"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 1,
            fontWeight: 600,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            whiteSpace: 'pre-wrap',
            msWordBreak: 'break-all',
            wordBreak: 'break-all',
          }}
        >
          {firstName}
        </Typography>

        <Typography>{t(HostInfo.host_card_subtitle)}</Typography>
      </Box>

      <List
        sx={{
          'display': 'flex',
          'flexDirection': 'column',
          'width': '33%',
          'flexShrink': 0,
          '& > *:not(:last-child)': {
            borderBottom: '1px solid',
            borderColor: 'secondary2.light',
          },
          '& > *': {
            py: '0.8rem',
          },
        }}
      >
        <Box component="li">
          <Typography
            variant="subtitle2"
            fontSize={FONT_SIZES.md}
            fontWeight="600"
            lineHeight="1"
            pb={0.5}
          >
            {reviews.count}
          </Typography>
          <Typography variant="xs">{t(HostInfo.host_card_reviews)}</Typography>
        </Box>

        <Box component="li">
          <Typography
            variant="subtitle2"
            fontSize={FONT_SIZES.md}
            fontWeight="600"
            lineHeight="1"
            pb={0.5}
          >
            {parseFloat(rating || '0.0').toFixed(1)}
            <StarIcon
              fontSize="small"
              sx={{
                ml: '0.1rem',
                pt: '0.2rem',
              }}
            />
          </Typography>
          <Typography variant="xs">{t(HostInfo.host_card_rating)}</Typography>
        </Box>

        <Box component="li">
          <Typography
            variant="subtitle2"
            fontSize={FONT_SIZES.md}
            fontWeight="600"
            lineHeight="1"
            pb={0.5}
          >
            {accommodations?.length || 0}
          </Typography>
          <Typography variant="xs">{t(HostInfo.host_card_listings)}</Typography>
        </Box>
      </List>
    </Box>
  );
}

export default HostProfileCard;
