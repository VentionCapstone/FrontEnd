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
  Profile: IProfile | null;
}

export interface IProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photoUrl: string;
  gender: 'MALE' | 'FEMALE';
  country: string;
  language: string;
  uiTheme: 'LIGHT' | 'DARK';
  description: string;
}
