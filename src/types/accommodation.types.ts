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
export interface AccommodationResponse {
  success: boolean;
  data: Accommodation;
}

export interface Accommodation {
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
