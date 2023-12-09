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

export type AccommodationAmenitiesResponse = {
  data: {
    [key: string]: boolean | string;
  };
};

export type EditAmenitiesResponse = AccommodationAmenitiesResponse & {
  message: string;
};
