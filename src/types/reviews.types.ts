export type ReviewResponse = {
  success: boolean;
  data: Review[];
  countByRating: CountByRating;
  averageRate: number;
  totalNumber: number;
};

export type Review = {
  id: string;
  userId: string;
  accommodationId: string;
  feedback: string;
  rating: number;
  createdAt: string;
  user: User;
};

export type Feedback = {
  feedback: string;
  rating: number;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  profile: {
    country: string;
    imageUrl: string;
  };
};

type CountByRating = {
  additionalProp1: number;
  additionalProp2: number;
  additionalProp3: number;
};
