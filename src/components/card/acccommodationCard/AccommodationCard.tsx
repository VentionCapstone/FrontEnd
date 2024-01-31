import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@src/config/routes.config';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { hasToken } from '@src/stores/slices/authSlice';
import { Accommodation } from '@src/types/accommodation.types';
import { HomeUIInfo } from '@src/types/i18n.types';
import CustomImage from '../../shared/CustomImage';
import FavoriteButton from './FavoriteButton';
import { accommodationCardStyles } from './accommodationCard.styles';

function AccommodationCard({
  accommodation: {
    thumbnailUrl,
    id,
    price,
    address: { country, city },
    isInWishlist,
    title,
  },
}: {
  accommodation: Accommodation;
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLoggedIn = useAppSelector(hasToken);

  const handleClickAccommodation = () => {
    navigate(ROUTES.accommodations.details(id));
  };

  return (
    <Box sx={accommodationCardStyles.root}>
      <Box flexGrow={1}>
        <Box onClick={handleClickAccommodation} sx={accommodationCardStyles.imageBox}>
          <CustomImage image={thumbnailUrl} name={country} />
          {isLoggedIn && <FavoriteButton isInWishlist={isInWishlist} accommodationId={id} />}
        </Box>
      </Box>

      <Typography fontWeight={600} sx={accommodationCardStyles.singleLine}>
        {title}
      </Typography>

      <Typography
        variant={'sm'}
        sx={accommodationCardStyles.singleLine}
        color={'secondary2.main'}
        marginBlock={0.5}
      >
        {city}, {country}
      </Typography>

      <Typography variant={'sm'}>
        <Box component={'span'} fontWeight={800}>
          ${price}{' '}
        </Box>
        {t(HomeUIInfo.card_night)}
      </Typography>
    </Box>
  );
}

const MemoizedAccommodationCard = memo(AccommodationCard);
export default MemoizedAccommodationCard;
