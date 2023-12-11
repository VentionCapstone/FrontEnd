export interface UserResponse {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  hashedRefreshToken: string;
  activationLink: string | null;
  profile: Profile | null;
}

export interface Profile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  imageUrl: string;
  gender: string;
  country: string;
  language: string;
  uiTheme: string;
  description: string;
}
