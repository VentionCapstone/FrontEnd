export interface CreateAccommodationResponse {
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
  availability: boolean;
  availableFrom: string;
  availableTo: string;
  description: string;
  previewImgUrl: string;
  address: Address;
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

export interface FormInput {
  accommodation: {
    thumbnailUrl: string;
    squareMeters: number;
    numberOfRooms: number;
    price: number;
    availability: boolean;
    availableFrom: string;
    availableTo: string;
    description: string;
  };
  address: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
}
