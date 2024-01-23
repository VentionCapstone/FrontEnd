import i18n from '@src/i18n/i18n';
import { z } from 'zod';
import { resetPasswordSchemaObject } from './auth.types';
import { ErrorTypes } from './i18n.types';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  language: any;
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
    currentPassword: z.string().min(1, i18n.t(ErrorTypes.field_is_required)).max(50),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: i18n.t(ErrorTypes.password_not_matching),
      path: ['confirmPassword'],
    }
  );

export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;
