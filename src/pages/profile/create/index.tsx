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
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import useCreateAccountMutation from '@src/api/mutations/account/useCreateAccountMutation';
import useUpdateAccountImageMutation from '@src/api/mutations/account/useUpdateAccountImageMutation';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { QUERY_KEYS, queryClient } from '@src/config/react-query.config';
import { ROUTES } from '@src/config/routes.config';
import {
  DEFAULT_COUNTRY,
  DEFAULT_FEMALE_IMAGE,
  DEFAULT_LANGUAGE,
  DEFAULT_MALE_IMAGE,
  PHONE_CODES_BY_COUNTRY,
} from '@src/constants';
import { PhoneCodesByCountry } from '@src/constants/constant.types';
import { CreateProfileForm, ErrorTypes, ProfileActions } from '@src/types/i18n.types';
import { Gender, Profile, ThemeMode } from '@src/types/profile.types';
import { useTranslation } from 'react-i18next';
import AddImage from '../AddImage';
import UserFullName from './UserFullName';
import UserPhoneNumber from './UserPhoneNumber';

function CreateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Profile>();

  const [selectedCountry, setSelectedCountry] = useState<PhoneCodesByCountry>(DEFAULT_COUNTRY);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: createAccountMutation, isPending: profileCreatePending } =
    useCreateAccountMutation();
  const { mutate: updateAccountImage, isPending: imageUpdatePending } =
    useUpdateAccountImageMutation(profileImage);

  const confirmCreation = async () => {
    navigate(ROUTES.root);
    toast.success(t(ProfileActions.profile_create));
    await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.user] });
  };

  const onSubmit: SubmitHandler<Profile> = (data) => {
    const defaultImage = data.gender === Gender.male ? DEFAULT_MALE_IMAGE : DEFAULT_FEMALE_IMAGE;

    const profileData: Profile = {
      ...data,
      phoneNumber: selectedCountry.code + data.phoneNumber,
      language: DEFAULT_LANGUAGE.code,
      uiTheme: ThemeMode.light,
    };

    try {
      if (profileImage) {
        createAccountMutation(profileData, {
          onSuccess: (res) => {
            updateAccountImage(res.id, {
              onSuccess: () => {
                confirmCreation().catch((error) => console.error(error));
              },
            });
          },
        });
      } else {
        createAccountMutation(
          { ...profileData, imageUrl: defaultImage },
          {
            onSuccess: () => {
              confirmCreation().catch((error) => console.error(error));
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(t(ErrorTypes.profile_error_creating));
    }

    reset();
  };

  if (profileCreatePending || imageUpdatePending) return <LoadingPrimary />;

  return (
    <>
      <Typography fontSize={{ xs: '1.5rem', md: '2rem' }} fontWeight={600} component={'h1'} mb={8}>
        {t(CreateProfileForm.title)}
      </Typography>

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <Stack gap={8}>
          <Box sx={{ marginInline: 'auto' }}>
            <AddImage setNewProfileImage={setProfileImage} />
          </Box>

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
          disabled={profileCreatePending}
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
