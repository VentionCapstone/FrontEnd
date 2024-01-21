import Box from '@mui/material/Box';

import useGetWishlistQuery from '@src/api/queries/wishlist/useGetWishlistQuery';
import AccommodationCard from '@src/components/card/acccommodationCard/AccommodationCard';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { mainStyles } from '../main/index.styles';

const Wishlist = () => {
  const { data: wishlist, isLoading } = useGetWishlistQuery();

  if (isLoading) <LoadingPrimary />;

  return (
    <div>
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
