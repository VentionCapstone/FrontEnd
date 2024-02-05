import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton } from '@mui/material';

import { useCallback } from 'react';
import { uploadMediaStyles } from './styles';

type SingleImageProps = {
  id: string;
  imageUrl: string;
  onDeleteImage: (id: string) => void;
};

function SingleImage({ id, imageUrl, onDeleteImage }: SingleImageProps) {
  const handleDeleteImage = useCallback(() => {
    onDeleteImage(id);
  }, [id, onDeleteImage]);

  return (
    <Box key={id} sx={uploadMediaStyles.imageWrapper}>
      <Box component={'img'} src={imageUrl} sx={uploadMediaStyles.image} />
      <Box sx={uploadMediaStyles.imageActionContainer}>
        <IconButton sx={uploadMediaStyles.imageAction} size="small" onClick={handleDeleteImage}>
          <RemoveIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SingleImage;
