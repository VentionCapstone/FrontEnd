import { useCallback, useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';

import { Box } from '@mui/material';
import useUpdateMediaAccommodationMutation from '@src/api/mutations/accommodations/useUpdateMediaAccommodationMutation';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { ACCOMMODATION_STEPS } from '@src/constants';
import { Media } from '@src/types/accommodation.types';
import SingleImage from './SingleImage';
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

  const handleDeleteImage = useCallback(
    (id: string) => {
      setDeletedImages([...deletedImages, id]);
      setAvailableImages(availableImages.filter((image) => image.id !== id));
    },
    [deletedImages, availableImages]
  );

  return (
    <>
      {isPending && <LoadingPrimary height="60vh" />}

      {!isPending && (
        <>
          <Box sx={uploadMediaStyles.listOfAvailableImagesContainer}>
            {availableImages.map(({ id, imageUrl }) => (
              <SingleImage key={id} id={id} imageUrl={imageUrl} onDeleteImage={handleDeleteImage} />
            ))}
          </Box>
          <UploadImage setImages={setImages} images={images} mutate={mutate} isNew={false} />
        </>
      )}
    </>
  );
}

export default UpdateMedia;
