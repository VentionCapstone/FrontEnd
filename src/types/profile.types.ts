import { z } from 'zod';
import { resetPasswordSchemaObject } from './auth.types';

export type ProfileState = {
  profile: Profile | null;
};

export interface Profile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string;
  imageUrl: string;
  gender: Gender;
  country: string;
  language: string;
  uiTheme: ThemeMode;
  description: string;
}

export enum ThemeMode {
  light = 'light',
  dark = 'dark',
}

export enum Gender {
  male = 'MALE',
  female = 'FEMALE',
}

export interface UpdatePasswordReq {
  oldPassword: string;
  newPassword: string;
}

export const updatePasswordSchema = resetPasswordSchemaObject
  .extend({
    currentPassword: z.string().min(1, 'This field is required').max(50),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    }
  );

export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;
