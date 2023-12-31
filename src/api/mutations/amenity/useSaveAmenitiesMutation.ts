import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import httpClient from '../../httpClient';
import { EndpointsConfig } from '../../../config/endpoints.config';
import { Amenities, EditAmenitiesResponse } from '../../../types/amenity.types';

type Params = {
  amenitiesToSave: Amenities;
  isNewAccomodation: boolean;
};

const createAmenities = async (amenitiesToSave: Amenities, accomodationId: string) => {
  const { data } = await httpClient.post<EditAmenitiesResponse>(
    EndpointsConfig.Amenity.Root(accomodationId),
    amenitiesToSave
  );
  return data;
};

const updateAmenities = async (amenitiesToSave: Amenities, accomodationId: string) => {
  const { data } = await httpClient.put<EditAmenitiesResponse>(
    EndpointsConfig.Amenity.Root(accomodationId),
    amenitiesToSave
  );
  return data;
};

export const useSaveAmenitiesMutation = (accomodationId: string) => {
  return useMutation({
    mutationFn: async ({ amenitiesToSave, isNewAccomodation }: Params) => {
      if (isNewAccomodation) return await createAmenities(amenitiesToSave, accomodationId);
      else return await updateAmenities(amenitiesToSave, accomodationId);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
};
