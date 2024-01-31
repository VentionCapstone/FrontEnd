import i18n from '@src/i18n/i18n';
import dayjs, { Dayjs } from 'dayjs';
import { MouseEventHandler } from 'react';
import { z } from 'zod';
import { Amenities } from './amenity.types';
import { ErrorTypes } from './i18n.types';

export type AccommodationFields =
  | 'title'
  | 'squareMeters'
  | 'numberOfRooms'
  | 'price'
  | 'allowedNumberOfPeople'
  | 'availableFrom'
  | 'available'
  | 'availableTo'
  | 'description';

export const accommodationSchema = z.object({
  title: z
    .string()
    .min(5, i18n.t(ErrorTypes.accommodation_title_min_length))
    .max(100, i18n.t(ErrorTypes.accommodation_title_max_length)),
  squareMeters: z.number().max(1000, i18n.t(ErrorTypes.accommodation_square_meters_max)),
  numberOfRooms: z
    .number()
    .min(1, i18n.t(ErrorTypes.accommodation_number_rooms_min))
    .max(100, i18n.t(ErrorTypes.accommodation_number_rooms_max)),
  price: z.number().max(10000, i18n.t(ErrorTypes.accommodation_price_max)),
  allowedNumberOfPeople: z
    .number()
    .min(1, i18n.t(ErrorTypes.accommodation_allowed_number_people_min))
    .max(100, i18n.t(ErrorTypes.accommodation_allowed_number_people_max)),
  availableFrom: z.string(),
  availableTo: z.string(),
  available: z.boolean(),
  description: z
    .string()
    .min(10, i18n.t(ErrorTypes.accommodation_description_min_length))
    .max(256, i18n.t(ErrorTypes.accommodation_description_max_length)),
  address: z.object({
    street: z.string().min(3, i18n.t(ErrorTypes.accommodation_address_country_min_length)),
    city: z.string().min(3, i18n.t(ErrorTypes.accommodation_address_city_min_length)),
    country: z.string().min(3, i18n.t(ErrorTypes.accommodation_address_country_min_length)),
    zipCode: z.string(),
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
  available: boolean;
  availableTo: string;
  description: string;
  previewImgUrl: string;
  address: AddressType;
  amenities: Amenities[];
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
  isInWishlist: boolean;
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

export interface AllMediaResponse {
  success: boolean;
  data: Media[];
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
  available: boolean;
  description: string;
  previewImgUrl: string;
  isDeleted: boolean;
  address: Address;
  media: Media[];
  amenities: Amenities;
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

export interface AccommodationSearchParamsType {
  handleSearchParamsChange: (params: URLSearchParams) => void;
}
type AcommodationPropsBase = {
  isNew: boolean;
  handleSearchParamsChange: (params: URLSearchParams) => void;
};

type CreateAccommodationProps = AcommodationPropsBase & {
  isNew: true;
  accommodation?: AccommodationSingle;
};

type UpdateAccommodationProps = AcommodationPropsBase & {
  isNew: false;
  accommodation: AccommodationSingle;
};

export type AccommodationFormProps = CreateAccommodationProps | UpdateAccommodationProps;

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

export interface SelectAddress {
  city: string;
  country: string;
  street: string;
}

export interface AddressWatchType {
  street: string;
  city: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}
