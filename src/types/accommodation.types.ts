import { z } from 'zod';

export const accommodationSchema = z.object({
  name: z.string().min(10).max(100),
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

export interface AccommodationRes {
  status: boolean;
  data: AccommodationType[];
}

export interface AccommodationType {
  id: string;
  name: string;
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
}

export interface AddressType {
  id: string;
  street: string;
  city: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}
