import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { IProfile } from '../../../types/profile.types';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { convertImageToBase64 } from '../../../utils';
import { useMutation } from '@tanstack/react-query';
import httpClient from '../../../api/httpClient';

type PhoneCodesByCountry = {
  name: string;
  code: number;
  numLength: number;
};

const PHONE_CODES_BY_COUNTRY: PhoneCodesByCountry[] = [
  { name: 'Uzbekistan', code: 998, numLength: 9 },
  { name: 'Russia', code: 7, numLength: 11 },
  { name: 'Kazakhstan', code: 7, numLength: 10 },
];

function CreateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IProfile>();

  const [userPhoto, setUserPhoto] = useState<File | undefined>(undefined);
  const [selectedCountry, setSelectedCountry] = useState<PhoneCodesByCountry>({
    name: 'Uzbekistan',
    code: 998,
    numLength: 9,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (profileData: IProfile) => httpClient.post('/users/profile', profileData),
  });

  const onSubmit: SubmitHandler<IProfile> = async (data) => {
    try {
      const photoUrl = userPhoto ? await convertImageToBase64(userPhoto) : '';

      const userProfile = {
        ...data,
        phoneNumber: selectedCountry.code + data.phoneNumber,
        photoUrl,
      };

      mutate(userProfile);
    } catch (error) {
      console.error(error);
    }

    reset();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e).catch((error) => {
      console.error(error);
    });
  };

  const phoneNumRegEx = (length: number) => {
    return new RegExp(`^\\d{${length}}$`);
  };

  return (
    <>
      <Typography fontSize={{ xs: '1.5rem', md: '2rem' }} fontWeight={600} component={'h1'} mb={8}>
        Create Profile
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Stack gap={8}>
          <Box width={'12rem'} position={'relative'} mx={{ xs: 'auto', md: 0 }} mb={6}>
            <Box
              sx={{
                width: '12rem',
                height: '12rem',
                bgcolor: 'primary.main',
                borderRadius: '50%',
              }}
            ></Box>

            <InputLabel
              sx={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                px: '1rem',
                py: '0.5rem',
                bgcolor: 'white',
                borderRadius: '1rem',
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
                transform: 'translate(-50%, 50%)',
                cursor: 'pointer',
              }}
              htmlFor="post-user-image"
            >
              <Stack direction={'row'} sx={{ gap: '0.5rem', alignItems: 'center' }}>
                <PhotoCameraIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
                <Typography variant={'sm'} fontWeight={700}>
                  Edit
                </Typography>
              </Stack>
            </InputLabel>

            <input
              onChange={(e) => setUserPhoto(e?.target?.files?.[0])}
              type="file"
              id="post-user-image"
              accept="image/*"
              style={{ display: 'none' }}
            />
          </Box>

          <Box>
            <Typography fontWeight={600}>Legal name</Typography>
            <Typography variant={'sm'} mt={1} mb={4} color={'secondary2.main'}>
              This is the name on your travel document, which could be a license or a passport.
            </Typography>

            <Stack rowGap={2} columnGap={4} direction={{ md: 'row' }}>
              <Box width={'100%'}>
                <TextField
                  {...register('firstName', {
                    required: 'This field is required',
                  })}
                  InputProps={{
                    inputProps: { maxLength: 20 },
                  }}
                  fullWidth
                  size="small"
                  label="First name"
                />
                {errors.firstName && (
                  <Typography variant={'xs'} mt={1} color={'error.main'}>
                    {errors.firstName.message}
                  </Typography>
                )}
              </Box>

              <Box width={'100%'}>
                <TextField
                  {...register('lastName', { required: 'This field is required' })}
                  InputProps={{
                    inputProps: { maxLength: 20 },
                  }}
                  fullWidth
                  size="small"
                  label="Last name"
                />
                {errors.lastName && (
                  <Typography variant={'xs'} mt={1} color={'error.main'}>
                    {errors.lastName.message}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>

          <Box>
            <Stack direction={{ md: 'row' }} columnGap={4} rowGap={8}>
              <Box width={'100%'}>
                <Typography fontWeight={600}>Country</Typography>

                <Typography variant={'sm'} mt={1} mb={4} color={'secondary2.main'}>
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
                        <MenuItem value={'Uzbekistan'}>Uzbekistan</MenuItem>
                        <MenuItem value={'Russia'}>Russia</MenuItem>
                        <MenuItem value={'Kazakhstan'}>Kazakhstan</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>

              <Box width={'100%'}>
                <Typography fontWeight={600}>Gender</Typography>

                <Typography variant={'sm'} mt={1} mb={4} color={'secondary2.main'}>
                  Select your gender
                </Typography>

                <FormControl fullWidth size="small">
                  <InputLabel id="user-gender-select-label">Gender</InputLabel>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue="MALE"
                    render={({ field }) => (
                      <Select {...field} labelId="user-gender-select-label" label="Gender">
                        <MenuItem value={'MALE'}>Male</MenuItem>
                        <MenuItem value={'FEMALE'}>Female</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography fontWeight={600}>Phone number</Typography>
            <Typography variant={'sm'} mt={1} mb={4} color={'secondary2.main'}>
              Add a number so confirmed guests and Airbnb can get in touch. You can add other
              numbers and choose how they’re used.
            </Typography>

            <Stack gap={4} direction={{ md: 'row' }}>
              <FormControl fullWidth size="small">
                <InputLabel id="number-country-select-label">Coutry</InputLabel>
                <Select
                  value={selectedCountry.name}
                  onChange={(e) => {
                    const selectedCountryName = e.target.value;
                    const country = PHONE_CODES_BY_COUNTRY.find(
                      (c) => c.name === selectedCountryName
                    );

                    if (country) {
                      setSelectedCountry(country);
                    }
                  }}
                  labelId="number-country-select-label"
                  id="number-country-select"
                  label="Country"
                >
                  {PHONE_CODES_BY_COUNTRY.map((country, index) => (
                    <MenuItem key={index} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box width={'100%'}>
                <TextField
                  {...register('phoneNumber', {
                    required: 'This field is required',
                    pattern: {
                      value: phoneNumRegEx(selectedCountry.numLength),
                      message: 'Please enter a valid phone number',
                    },
                  })}
                  fullWidth
                  size="small"
                  label="Phone number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+{selectedCountry.code}</InputAdornment>
                    ),
                    inputProps: { maxLength: selectedCountry.numLength },
                  }}
                />
                {errors.phoneNumber && (
                  <Typography variant={'xs'} mt={1} color={'error.main'}>
                    {errors.phoneNumber.message}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography fontWeight={600}>Decsription</Typography>
            <Typography variant={'sm'} mt={1} mb={4} color={'secondary2.main'}>
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

        <Button type="submit" disabled={isPending} variant={'contained'} sx={{ mt: 8 }}>
          Create
        </Button>
      </form>
    </>
  );
}

export default CreateProfile;
