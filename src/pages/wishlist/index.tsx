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

  if (isLoading) <LoadingPrimary />;

  return (
    <div>
      <Typography
        mb={{ xs: 4, md: 6, lg: 10 }}
        fontSize={{ xs: '1.5rem', md: '2rem' }}
        fontWeight={600}
        component={'h1'}
      >
        {t(WishlistTypes.title)}
      </Typography>

      <Box sx={mainStyles.accommmodationCard}>
        {wishlist &&
          wishlist.map(({ id, accommodation }) => (
            <AccommodationCard key={id} accommodation={accommodation} />
          ))}
      </Box>
    </div>
  );
};

export default Wishlist;
