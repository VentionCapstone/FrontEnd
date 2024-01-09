import { MouseEventHandler } from 'react';
import { z } from 'zod';

export const accommodationSchema = z.object({
  title: z.string().min(10).max(100),
  thumbnailUrl: z.string().url({ message: 'Thumbnail url must be a valid url' }),
  squareMeters: z.number(),
  numberOfRooms: z.number(),
  price: z.number(),
  allowedNumberOfPeople: z.number(),
  availableFrom: z.string(),
  availableTo: z.string(),
  description: z.string().min(10).max(256),
  previewImgUrl: z.string(),
  address: z.object({
    street: z.string().min(3, 'Street name must be at least 3 characters'),
    city: z.string().min(3, 'City name must be at least 3 characters'),
    country: z.string().min(3, 'Country name must be at least 3 characters'),
    zipCode: z.string().min(3, 'Zip code must be at least 3 characters'),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export type AccommodationReq = z.infer<typeof accommodationSchema>;

export type AccommodationRes = {
  status: boolean;
  data: AccommodationType[];
};

export type AccommodationType = {
  isDeleted: boolean;
  id: string;
  title: string;
  addressId: string;
  thumbnailUrl: string;
  ownerId: string;
  squareMeters: number;
  numberOfRooms: number;
  price: number;
  allowedNumberOfPeople: number;
  availableFrom: string;
  availableTo: string;
  description: string;
  previewImgUrl: string;
  address: AddressType;
};

export type AddressType = {
  id: string;
  street: string;
  city: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
};
export interface ResponseAccommodationList {
  success: boolean;
  priceRange: PriceRange;
  totalCount: number;
  data: Accommodation[];
}

export interface PriceRange {
  curMinPrice: number;
  curMaxPrice: number;
  totalMinPrice: number;
  totalMaxPrice: number;
}

export interface Accommodation {
  id: string;
  thumbnailUrl: string;
  squareMeters: number;
  numberOfRooms: number;
  allowedNumberOfPeople: number;
  price: number;
  address: Address;
}

export interface Address {
  country: string;
}

export interface InputFilter {
  rooms?: number;
  people?: number;
  orderByRooms?: string;
  orderByPeople?: string;
  orderByPrice?: string;
  curMinPrice: number;
  curMaxPrice: number;
}

export type ObjType = {
  id: number | string;
  name: string;
};

export type MainModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: Record<string, string>;
  setFilters: (params: URLSearchParams) => void;
  priceRange: {
    totalMaxPrice: number;
    totalMinPrice: number;
  };
  setInvisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ConfirmationModalProps = {
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

export type FormValue = {
  minPrice: string;
  maxPrice: string;
  minRooms: string;
  minPeople: string;
  totalMinPrice: number;
  totalMaxPrice: number;
  orderByPrice: string;
  orderByPeople: string;
  orderByRoom: string;
};

export type DefaultSearchParamsType = {
  minPrice: string;
  maxPrice: string;
  minRooms: string;
  minPeople: string;
  orderByPrice: string;
  orderByPeople: string;
  orderByRoom: string;
};
