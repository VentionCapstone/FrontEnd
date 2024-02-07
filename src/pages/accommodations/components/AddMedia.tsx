import { useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';

import useUploadMediaAccommodationMutation from '@src/api/mutations/accommodations/useUploadMediaAccommodationMutation';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { AccommodationSteps } from '@src/types/global.types';
import UploadImage from './UploadImage';

type AddMediaProps = {
  accommodationId: string;
  handleSearchParamsChange: (params: URLSearchParams) => void;
};

function AddMedia({ accommodationId, handleSearchParamsChange }: AddMediaProps) {
  const [images, setImages] = useState<ImageListType>([]);

  const { mutate, isPending, isSuccess } = useUploadMediaAccommodationMutation({
    accommodationId,
    images,
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

  if (isPending) {
    return <LoadingPrimary height="60vh" />;
  }

  return <UploadImage setImages={setImages} images={images} mutate={mutate} isNew />;
}

export default AddMedia;
