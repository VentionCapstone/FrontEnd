import { Control, FieldValues, Path } from 'react-hook-form';
import { User } from './user.types';

export type AuthState = {
  token: string | null;
  user: User | null;
};

export interface AuthData {
  email: string;
  password: string;
  confirm_password?: string;
}

export type RefreshingPromise = { access_token: string } | { error: Error };

export type isRefreshingType = Promise<RefreshingPromise> | boolean;

export interface RefreshResponse {
  tokens: Tokens;
  message: string;
}
export interface LoginResponse {
  tokens: Tokens;
  id: string;
}
export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface PasswordInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  control: Control<TFieldValues>;
  confirmPassword?: string;
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
}
