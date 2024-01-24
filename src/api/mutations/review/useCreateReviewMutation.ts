import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { CreateReviewReq } from '@src/types/review.types';
import { useMutation } from '@tanstack/react-query';

export const useCreateReviewMutation = (accommodationId: string, bookingId: string) => {
  return useMutation({
    mutationFn: async (review: CreateReviewReq) => {
      await httpClient.post(ENDPOINTS.review.create(accommodationId, bookingId), review);
    },
  });
};
