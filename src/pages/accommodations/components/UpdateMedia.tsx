import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';

import { Box, IconButton } from '@mui/material';
import useUpdateMediaAccommodationMutation from '@src/api/mutations/accommodations/useUpdateMediaAccommodationMutation';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { ACCOMMODATION_STEPS } from '@src/constants';
import { Media } from '@src/types/accommodation.types';
import UploadImage from './UploadImage';
import { uploadMediaStyles } from './styles';

type UpdateMediaProps = {
  accommodationId: string;
  handleSearchParamsChange: (params: URLSearchParams) => void;
  media: Media[];
};

function UpdateMedia({ accommodationId, handleSearchParamsChange, media }: UpdateMediaProps) {
  const [images, setImages] = useState<ImageListType>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [availableImages, setAvailableImages] = useState<Media[]>(media);

  const { mutate, isPending, isSuccess } = useUpdateMediaAccommodationMutation({
    accommodationId,
    images,
    deletedImages,
  });

  useEffect(() => {
    if (isSuccess) {
      handleSearchParamsChange(
        new URLSearchParams({
          currentStep: ACCOMMODATION_STEPS.amenities,
          accommodationId: accommodationId,
        })
      );
    }
  }, [isSuccess, accommodationId, handleSearchParamsChange]);

  const handleDeleteImage = (id: string) => {
    setDeletedImages([...deletedImages, id]);
    setAvailableImages(availableImages.filter((image) => image.id !== id));
  };

  return (
    <>
      {isPending && <LoadingPrimary height="60vh" />}

      {!isPending && (
        <>
          <Box sx={uploadMediaStyles.listOfAvailableImagesContainer}>
            {availableImages.map(({ id, imageUrl }) => (
              <Box key={id} sx={uploadMediaStyles.imageWrapper}>
                <Box component={'img'} src={imageUrl} sx={uploadMediaStyles.image} />
                <Box sx={uploadMediaStyles.imageActionContainer}>
                  <IconButton
                    sx={uploadMediaStyles.imageAction}
                    size="small"
                    onClick={() => handleDeleteImage(id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
          <UploadImage setImages={setImages} images={images} mutate={mutate} />
        </>
      )}
    </>
  );
}

export default UpdateMedia;
