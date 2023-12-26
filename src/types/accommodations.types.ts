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
