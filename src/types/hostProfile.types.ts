export interface HostProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  isEmailVerified: boolean;
  language: string;
  country: string;
  description: string;
  imageUrl: string;
  joinedAt: string;
  rating: string | null;
  accommodations: HostAccommodation[] | null;
  reviews: {
    count: number;
    page: number;
    list: HostReviews[] | null;
  };
}

export interface HostProfileResponse {
  success: boolean;
  data: HostProfile;
}

export interface HostAccommodation {
  id: string;
  title: string;
  previewImgUrl: string;
  rating: number;
}

export interface HostReviews {
  id: string;
  accommodationId: string;
  feedback: string;
  rating: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    profile: {
      imageUrl: string;
    };
  };
}
