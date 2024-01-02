import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import AddImage from '../AddImage';
import UserFullName from './UserFullName';
import UserPhoneNumber from './UserPhoneNumber';
import { Gender, Profile, ThemeMode } from '../../../types/profile.types';
import { DEFAULT_COUNTRY, PHONE_CODES_BY_COUNTRY } from '../constants';
import { PhoneCodesByCountry } from '../constants.types';
import useCreateAccountMutation from '../../../api/mutations/account/useCreateAccountMutation';

function CreateProfile() {
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
      language: 'en',
      uiTheme: ThemeMode.light,
    };

    mutate(userProfile);
    reset();
  };

  return (
    <>
      <Typography fontSize={{ xs: '1.5rem', md: '2rem' }} fontWeight={600} component={'h1'} mb={8}>
        Create Profile
      </Typography>

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <Stack gap={8}>
          <AddImage imageUrl={imageUrl} setImageUrl={setImageUrl} />

          <UserFullName register={register} errors={errors} />

          <Box>
            <Stack direction={{ md: 'row' }} columnGap={4} rowGap={8}>
              <Box width={'100%'}>
                <Typography fontWeight={600} mb={{ xs: 3, md: 4 }}>
                  Select country
                </Typography>

                <FormControl fullWidth size="small">
                  <InputLabel id="user-country-select-label">Coutry</InputLabel>
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
                  Select your gender
                </Typography>

                <FormControl fullWidth size="small">
                  <InputLabel id="user-gender-select-label">Gender</InputLabel>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={Gender.male}
                    render={({ field }) => (
                      <Select {...field} labelId="user-gender-select-label" label="Gender">
                        <MenuItem value={Gender.male}>Male</MenuItem>
                        <MenuItem value={Gender.female}>Female</MenuItem>
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
            <Typography fontWeight={600}>Decsription</Typography>
            <Typography variant={'sm'} mt={1} mb={{ xs: 3, md: 4 }} color={'secondary2.main'}>
              Tell us a little bit about yourself, so your future hosts or guests can get to know
              you.
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
          Create
        </Button>
      </form>
    </>
  );
}

export default CreateProfile;
