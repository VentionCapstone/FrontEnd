import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { z } from 'zod';

import { STRONG_PASSWORD_REGEX } from '@src/config/regexp.config';
import { User } from './user.types';

export type AuthState = {
  token: string | null;
  user: User | null;
};

export const signUpSchema = z
  .object({
    email: z.string().email('Email should be a valid'),
    password: z
      .string()
      .regex(
        STRONG_PASSWORD_REGEX,
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      )
      .min(8, 'Password must be at least 8 characters')
      .max(50),
    confirm_password: z.string().min(1, 'Confirm password should not empty').max(50),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: 'Passwords must match!',
      path: ['confirm_password'],
    }
  );

export type SignUpReq = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email('Email should be a valid'),
  password: z.string().min(1, 'Password should not empty').max(50),
});

export type SignInReq = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email should be a valid'),
});

export type ForgotPasswordReq = z.infer<typeof forgotPasswordSchema>;

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
  errors: FieldErrors<TFieldValues>;
}
