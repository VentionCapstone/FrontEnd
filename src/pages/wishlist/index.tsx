import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import useGetWishlistQuery from '@src/api/queries/wishlist/useGetWishlistQuery';
import AccommodationCard from '@src/components/card/acccommodationCard/AccommodationCard';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { Wishlist as WishlistTypes } from '@src/types/i18n.types';
import { mainStyles } from '../main/index.styles';

const Wishlist = () => {
  const { data: wishlist, isLoading } = useGetWishlistQuery();
  const { t } = useTranslation();

  if (isLoading) return <LoadingPrimary />;

  return (
    <Box>
      <Typography mb={{ xs: 4, md: 6, lg: 10 }} variant={'heading'}>
        {t(WishlistTypes.title)}
      </Typography>

      <Box sx={{ ...mainStyles.accommmodationCard, justifyContent: 'flex-start' }}>
        {wishlist?.length ? (
          wishlist.map(({ id, accommodation }) => (
            <AccommodationCard key={id} accommodation={accommodation} />
          ))
        ) : (
          <Box>
            <Typography fontSize={'1.25rem'} fontWeight={600} mb={1}>
              {t(WishlistTypes.wishlits_empty_title)}
            </Typography>
            <Typography variant={'sm'} color={'secondary2.main'} maxWidth={'30rem'}>
              {t(WishlistTypes.wishlits_empty_text)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Wishlist;
