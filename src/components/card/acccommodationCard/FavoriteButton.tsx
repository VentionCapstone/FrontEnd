import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';

import useAddToWishlistMutation from '@src/api/mutations/wishlist/useAddToWishlistMutation';
import useDeleteFromWishlistMutation from '@src/api/mutations/wishlist/useDeleteFromWishlistMutation';
import { accommodationCardStyles } from './accommodationCard.styles';

const translucentDark = 'rgba(0, 0, 0, 0.5)';

const FavoriteButton = ({
  isInWishlist,
  accommodationId,
}: {
  isInWishlist: boolean;
  accommodationId: string;
}) => {
  const { mutate: addToWishlist } = useAddToWishlistMutation();
  const { mutate: deleteFromWishlist } = useDeleteFromWishlistMutation();
  const [inWishlist, setInWishlist] = useState(isInWishlist);

  const handleClickFavorite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    inWishlist ? deleteFromWishlist(accommodationId) : addToWishlist(accommodationId);
    setInWishlist((prev) => !prev);
  };

  useEffect(() => {
    setInWishlist(isInWishlist);
  }, [isInWishlist]);

  return (
    <Box sx={accommodationCardStyles.favoriteIcon}>
      <IconButton onClick={handleClickFavorite}>
        <FavoriteIcon sx={{ color: inWishlist ? 'secondary.main' : translucentDark }} />
      </IconButton>
    </Box>
  );
};

export default FavoriteButton;
