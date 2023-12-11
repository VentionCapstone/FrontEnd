export interface ProfileResponse {
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
  Profile: object | null;
}
