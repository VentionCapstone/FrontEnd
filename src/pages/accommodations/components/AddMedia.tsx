import { useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';

import useUploadMediaAccommodationMutation from '@src/api/mutations/accommodations/useUploadMediaAccommodationMutation';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { ACCOMMODATION_STEPS } from '@src/constants';
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
          currentStep: ACCOMMODATION_STEPS.amenities,
          accommodationId: accommodationId,
        })
      );
    }
  }, [isSuccess, accommodationId, handleSearchParamsChange]);

  return (
    <>
      {isPending && <LoadingPrimary height="60vh" />}

      {!isPending && (
        <UploadImage setImages={setImages} images={images} mutate={mutate} isNew={true} />
      )}
    </>
  );
}

export default AddMedia;
