import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

import useAddToWishlistMutation from '@src/api/mutations/wishlist/useAddToWishlistMutation';
import useDeleteFromWishlistMutation from '@src/api/mutations/wishlist/useDeleteFromWishlistMutation';
import { accommodationCardStyles } from './accommodationCard.styles';

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

  return (
    <Box sx={accommodationCardStyles.favoriteIcon}>
      <IconButton onClick={handleClickFavorite}>
        <FavoriteIcon sx={{ color: inWishlist ? 'secondary.main' : 'rgba(0, 0, 0, 0.5)' }} />
      </IconButton>
    </Box>
  );
};

export default FavoriteButton;
