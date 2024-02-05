import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { useMutation } from '@tanstack/react-query';
import { ImageListType } from 'react-images-uploading';

interface UpdateMediaAccommodationProps {
  accommodationId: string;
  images: ImageListType;
  deletedImages: string[];
}

function useUpdateMediaAccommodationMutation({
  accommodationId,
  images,
  deletedImages,
}: UpdateMediaAccommodationProps) {
  return useMutation({
    mutationFn: async () => {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append('images', image.file as File);
      });

      deletedImages.forEach((imageId) => {
        formData.append('deleted', imageId);
      });

      await httpClient.put(
        ENDPOINTS.accommodation.uploadMediaToAccommodation(accommodationId),
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
    },
  });
}

export default useUpdateMediaAccommodationMutation;
