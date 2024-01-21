import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { useMutation } from '@tanstack/react-query';
import { ImageListType } from 'react-images-uploading';

interface UploadMediaAccommodationProps {
  accommodationId: string;
  images: ImageListType;
  setCurrentStep: (step: number) => void;
}

function useUploadMediaAccommodationMutation({
  accommodationId,
  images,
  setCurrentStep,
}: UploadMediaAccommodationProps) {
  return useMutation({
    mutationFn: async () => {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append('images', image.file as File);
      });

      await httpClient.post(
        ENDPOINTS.accommodation.uploadMediaToAccommodation(accommodationId),
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
    },
    onSuccess: () => {
      setCurrentStep(3);
    },
  });
}

export default useUploadMediaAccommodationMutation;
