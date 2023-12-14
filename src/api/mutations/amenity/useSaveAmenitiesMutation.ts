import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Amenities, EditAmenitiesResponse } from '../../../types/amenity.types';
import httpClient from '../../httpClient';
import { AMENITIES_ROUTE } from '../../routes';

type Params = {
  amenitiesToSave: Amenities;
  isNewAccomodation: boolean;
};

const createAmenities = async (amenitiesToSave: Amenities, accomodationId: string) => {
  const { data } = await httpClient.post<EditAmenitiesResponse>(
    `${AMENITIES_ROUTE}/${accomodationId}`,
    amenitiesToSave
  );
  return data;
};

const updateAmenities = async (amenitiesToSave: Amenities, accomodationId: string) => {
  const { data } = await httpClient.put<EditAmenitiesResponse>(
    `${AMENITIES_ROUTE}/${accomodationId}`,
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
