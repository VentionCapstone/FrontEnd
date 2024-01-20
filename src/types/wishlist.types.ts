export type WishlistResponse = {
  success: boolean;
  data: Wishlist[];
};

export type Wishlist = {
  id: string;
  createdAt: string;
  accommodation: Accommodation;
};

type Accommodation = {
  id: string;
  thumbnailUrl: string;
  squareMeters: number;
  numberOfRooms: number;
  allowedNumberOfPeople: number;
  price: number;
  address: {
    street: string;
    city: string;
    country: string;
  };
};
