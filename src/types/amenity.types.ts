import { ReactElement } from 'react';

export type EditAmenitiesProps = {
  accomodationId: string;
  isNew: boolean;
};

export type AmenityList = {
  id: string;
  name: string;
  icon: ReactElement;
  added?: boolean;
}[];

export type AmenityListResponse = {
  data: string[];
  success: boolean;
};

export type Amenities = {
  [key: string]: boolean | string;
};

export type AccommodationAmenitiesResponse = {
  data: Amenities;
};

export type EditAmenitiesResponse = AccommodationAmenitiesResponse & {
  message: string;
};
