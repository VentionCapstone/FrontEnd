import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import useCreateAccountMutation from '@src/api/mutations/account/useCreateAccountMutation';
import { DEFAULT_LANGUAGE } from '@src/constants';
import { CreateProfileForm } from '@src/types/i18n.types';
import { Gender, Profile, ThemeMode } from '@src/types/profile.types';
import { useTranslation } from 'react-i18next';
import AddImage from '../AddImage';
import { DEFAULT_COUNTRY, PHONE_CODES_BY_COUNTRY } from '../constants';
import { PhoneCodesByCountry } from '../constants.types';
import UserFullName from './UserFullName';
import UserPhoneNumber from './UserPhoneNumber';

function CreateProfile() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Profile>();
  const defaultMaleImage =
    'https://i.pinimg.com/564x/48/6c/a0/486ca00640b169300b48e9ceacd8e401.jpg';
  const defaultFemaleImage =
    'https://i.pinimg.com/564x/39/42/01/39420149269ede36847932935b26f0b8.jpg';

  const [imageUrl, setImageUrl] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<PhoneCodesByCountry>(DEFAULT_COUNTRY);
  const { mutate, isPending } = useCreateAccountMutation();

  const onSubmit: SubmitHandler<Profile> = (data) => {
    const defaultImage = data.gender === Gender.male ? defaultMaleImage : defaultFemaleImage;

    const userProfile: Profile = {
      ...data,
      phoneNumber: selectedCountry.code + data.phoneNumber,
      imageUrl: defaultImage,
      language: DEFAULT_LANGUAGE,
      uiTheme: ThemeMode.light,
    };

    mutate(userProfile);
    reset();
  };

  return (
    <>
      <Typography fontSize={{ xs: '1.5rem', md: '2rem' }} fontWeight={600} component={'h1'} mb={8}>
        {t(CreateProfileForm.title)}
      </Typography>

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <Stack gap={8}>
          <AddImage imageUrl={imageUrl} setImageUrl={setImageUrl} />

          <UserFullName register={register} errors={errors} />

          <Box>
            <Stack direction={{ md: 'row' }} columnGap={4} rowGap={8}>
              <Box width={'100%'}>
                <Typography fontWeight={600} mb={{ xs: 3, md: 4 }}>
                  {t(CreateProfileForm.select_country)}
                </Typography>

                <FormControl fullWidth size="small">
                  <InputLabel id="user-country-select-label">
                    {t(CreateProfileForm.country)}
                  </InputLabel>
                  <Controller
                    name="country"
                    control={control}
                    defaultValue="Uzbekistan"
                    render={({ field }) => (
                      <Select {...field} labelId="user-country-select-label" label="Country">
                        {PHONE_CODES_BY_COUNTRY.map((country, index) => (
                          <MenuItem key={index} value={country.name}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>

              <Box width={'100%'}>
                <Typography fontWeight={600} mb={4}>
                  {t(CreateProfileForm.gender)}
                </Typography>

                <FormControl fullWidth size="small">
                  <InputLabel id="user-gender-select-label">
                    {t(CreateProfileForm.gender)}
                  </InputLabel>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={Gender.male}
                    render={({ field }) => (
                      <Select {...field} labelId="user-gender-select-label" label="Gender">
                        <MenuItem value={Gender.male}>{t(CreateProfileForm.male)}</MenuItem>
                        <MenuItem value={Gender.female}>{t(CreateProfileForm.female)}</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
            </Stack>
          </Box>

          <UserPhoneNumber
            register={register}
            errors={errors}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />

          <Box>
            <Typography fontWeight={600}>{t(CreateProfileForm.description)}</Typography>
            <Typography variant={'sm'} mt={1} mb={{ xs: 3, md: 4 }} color={'secondary2.main'}>
              {t(CreateProfileForm.description_desc)}
            </Typography>

            <TextField
              {...register('description')}
              InputProps={{
                inputProps: { maxLength: 200 },
              }}
              multiline
              minRows={2}
              maxRows={6}
              fullWidth
            />
          </Box>
        </Stack>

        <Button
          color={'secondary'}
          type="submit"
          disabled={isPending}
          variant={'contained'}
          sx={{
            width: {
              xs: '100%',
              md: 'fit-content',
            },
            mt: 8,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
          }}
        >
          {t(CreateProfileForm.create_btn)}
        </Button>
      </form>
    </>
  );
}

export default CreateProfile;
