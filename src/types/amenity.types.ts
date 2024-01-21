import { ReactElement } from 'react';

type EditAmenitiesPropsBase = {
  isNew: boolean;
  accommodationId: string;
};

type CreateAmenitiesProps = EditAmenitiesPropsBase & {
  isNew: true;
  accommodationAmenities?: Amenities;
};

type EditAmenitiesProps = EditAmenitiesPropsBase & {
  isNew: false;
  accommodationAmenities: Amenities;
};

export type AmenitiesProps = CreateAmenitiesProps | EditAmenitiesProps;

export type AmenitySetting = {
  id: string;
  name: string;
  icon: ReactElement;
  added?: boolean;
};

export type AmenityListResponse = {
  data: string[];
  success: boolean;
};

export type Amenities = {
  [key: string]: boolean | string;
};

export type EditAmenitiesResponse = {
  data: Amenities;
  message: string;
};
