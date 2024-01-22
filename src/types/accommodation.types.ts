import dayjs, { Dayjs } from 'dayjs';
import { MouseEventHandler } from 'react';
import { z } from 'zod';

export type AccommodationFields =
  | 'title'
  | 'thumbnailUrl'
  | 'squareMeters'
  | 'numberOfRooms'
  | 'price'
  | 'allowedNumberOfPeople'
  | 'availableFrom'
  | 'availableTo'
  | 'description'
  | 'previewImgUrl'
  | 'address.street'
  | 'address.city'
  | 'address.country'
  | 'address.zipCode';

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
  totalCount: number;
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
  title: string;
  id: string;
  thumbnailUrl: string;
  squareMeters: number;
  numberOfRooms: number;
  allowedNumberOfPeople: number;
  price: number;
  address: Address;
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
  location: string;
  checkInDate: string;
  checkOutDate: string;
};

export type MapModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchParamsAsObject: Record<string, string>;
};

export type SearchBarProps = {
  priceRange: {
    totalMaxPrice: number;
    totalMinPrice: number;
  };
  setSearchParams: (params: URLSearchParams) => void;
  searchParamsAsObject: Record<string, string>;
};

export type SearchByCityInputProps = {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};

export type SearchByDateInputProps = {
  isMobile: boolean;
  label: string;
  date: string;
  minDate: dayjs.Dayjs | undefined;
  maxDate: dayjs.Dayjs | undefined;
  handleDateChange: (newValue: dayjs.Dayjs | null) => void;
  UtcTimeToLocal: (value: Dayjs) => dayjs.Dayjs;
};

export type SearchModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setCheckInDate: React.Dispatch<React.SetStateAction<string>>;
  setCheckOutDate: React.Dispatch<React.SetStateAction<string>>;
  searchParamsAsObject: Record<string, string>;
  handleSearchClick: () => void;
  localTimeToUtc: (value: Dayjs) => dayjs.Dayjs;
  UtcTimeToLocal: (value: Dayjs) => dayjs.Dayjs;
  priceRange: {
    totalMaxPrice: number;
    totalMinPrice: number;
  };
  setSearchParams: (params: URLSearchParams) => void;
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
  location: string;
  checkInDate: string;
  checkOutDate: string;
};

export type DefaultSearchParamsType = {
  minPrice: string;
  maxPrice: string;
  minRooms: string;
  minPeople: string;
  orderByPrice: string;
  orderByPeople: string;
  orderByRoom: string;
  location: string;
  checkInDate: string;
  checkOutDate: string;
};

export interface AccommodationSingleResponse {
  success: boolean;
  data: AccommodationSingle;
}

export interface AccommodationSingle {
  id: string;
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
  isDeleted: boolean;
  address: Address;
  media: Media[];
  amenities: Amenity[];
  owner: Owner;
  timezoneOffset: number;
  title: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export interface Media {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  accommodationId: string;
}

export interface Amenity {
  id: string;
  hasWifi: boolean;
  hasParking: boolean;
  hasSwimmingPool: boolean;
  hasPetAllowance: boolean;
  isQuiteArea: boolean;
  hasBackyard: boolean;
  hasSmokingAllowance: boolean;
  isChildFriendly: boolean;
  hasHospitalNearby: boolean;
  isCloseToCenter: boolean;
  hasLaundryService: boolean;
  hasKitchen: boolean;
  hasAirConditioning: boolean;
  hasTv: boolean;
  hasAirportTransfer: boolean;
  accommodationId: string;
  otherAmenities: string | null;
}

export interface Owner {
  createdAt: string;
  firstName: string;
  id: string;
  isVerified: boolean;
  lastName: string;
  profile: {
    country: string;
    imageUrl: string;
    language: string;
  };
}
