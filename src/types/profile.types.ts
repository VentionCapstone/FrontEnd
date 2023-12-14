export interface UserResponse {
  message: string;
  data: User;
}

export interface User {
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
  Profile: Profile | null;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  imageUrl: string;
  gender: 'MALE' | 'FEMALE';
  country: string;
  language: string;
  uiTheme: 'LIGHT' | 'DARK';
  description: string;
}
