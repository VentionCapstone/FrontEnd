import { useCallback, useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';

import { Box } from '@mui/material';
import useUpdateMediaAccommodationMutation from '@src/api/mutations/accommodations/useUpdateMediaAccommodationMutation';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { Media } from '@src/types/accommodation.types';
import { AccommodationSteps } from '@src/types/global.types';
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
          currentStep: AccommodationSteps.amenities.toString(),
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

  if (isPending) {
    return <LoadingPrimary height="60vh" />;
  }

  return (
    <>
      <Box sx={uploadMediaStyles.listOfAvailableImagesContainer}>
        {availableImages.map(({ id, imageUrl }) => (
          <SingleImage key={id} id={id} imageUrl={imageUrl} onDeleteImage={handleDeleteImage} />
        ))}
      </Box>
      <UploadImage setImages={setImages} images={images} mutate={mutate} isNew={false} />
    </>
  );
}

export default UpdateMedia;
