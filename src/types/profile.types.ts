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
  light = 'LIGHT',
  dark = 'DARK',
}

export enum Gender {
  male = 'MALE',
  female = 'FEMALE',
}
