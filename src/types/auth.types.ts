import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';

import { STRONG_PASSWORD_REGEX } from '@src/config/regexp.config';
import i18n from '@src/i18n/i18n';
import { z } from 'zod';
import { ErrorTypes } from './i18n.types';
import { User } from './user.types';

export type AuthState = {
  token: string | null;
  user: User | null;
};

export const signUpSchema = z
  .object({
    email: z.string().email(i18n.t(ErrorTypes.enter_valid_email)),
    password: z
      .string()
      .regex(STRONG_PASSWORD_REGEX, i18n.t(ErrorTypes.password_must_contain))
      .min(8, i18n.t(ErrorTypes.password_invalid_length))
      .max(50),
    confirm_password: z.string().min(1, i18n.t(ErrorTypes.field_is_required)).max(50),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: i18n.t(ErrorTypes.password_not_matching),
      path: ['confirm_password'],
    }
  );

export type SignUpReq = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email(i18n.t(ErrorTypes.enter_valid_email)),
  password: z.string().min(1, i18n.t(ErrorTypes.field_is_required)).max(50),
});

export type SignInReq = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(i18n.t(ErrorTypes.enter_valid_email)),
});

export type ForgotPasswordReq = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchemaObject = z.object({
  newPassword: z
    .string()
    .regex(STRONG_PASSWORD_REGEX, i18n.t(ErrorTypes.password_must_contain))
    .min(8, i18n.t(ErrorTypes.password_invalid_length))
    .max(50),
  confirmPassword: z.string().min(1, i18n.t(ErrorTypes.field_is_required)).max(50),
});

export const resetPasswordSchema = resetPasswordSchemaObject.refine(
  (values) => {
    return values.newPassword === values.confirmPassword;
  },
  {
    message: i18n.t(ErrorTypes.password_not_matching),
    path: ['confirmPassword'],
  }
);

export type ResetPasswordReq = z.infer<typeof resetPasswordSchema>;

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
  size?: 'small' | 'medium';
}

export interface CommonResponse {
  success: boolean;
  message: string;
}
