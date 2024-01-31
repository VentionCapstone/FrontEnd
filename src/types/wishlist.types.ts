import { Accommodation } from './accommodation.types';

export type WishlistResponse = {
  success: boolean;
  data: Wishlist[];
};

export type Wishlist = {
  id: string;
  createdAt: string;
  accommodation: Accommodation;
};
