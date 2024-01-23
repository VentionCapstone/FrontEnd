import { Box, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@src/config/routes.config';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { hasToken } from '@src/stores/slices/authSlice';
import { Wishlist } from '@src/types/wishlist.types';
import CustomImage from '../../shared/CustomImage';
import FavoriteButton from './FavoriteButton';
import { accommodationCardStyles } from './accommodationCard.styles';
import { HomeUIInfo } from '@src/types/i18n.types';

function AccommodationCard({
  accommodation: {
    thumbnailUrl,
    id,
    price,
    address: { country, city },
    isInWishlist,
  },
}: {
  accommodation: Wishlist['accommodation'];
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLoggedIn = useAppSelector(hasToken);

  const handleClickAccommodation = () => {
    navigate(ROUTES.accommodations.details(id));
  };

  return (
    <Box sx={accommodationCardStyles.root}>
      <Stack gap={3} width="100%">
        <Box onClick={handleClickAccommodation} sx={accommodationCardStyles.imageBox}>
          <CustomImage image={thumbnailUrl} name={country} />
          {isLoggedIn && <FavoriteButton isInWishlist={isInWishlist} accommodationId={id} />}
        </Box>
        <Stack>
          <Typography mt={2}>
            {city}, {country}
          </Typography>
          <Typography>
            <Box component={'span'} fontWeight={800}>
              ${price}{' '}
            </Box>
            {t(HomeUIInfo.card_night)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

const MemoizedAccommodationCard = memo(AccommodationCard);
export default MemoizedAccommodationCard;
