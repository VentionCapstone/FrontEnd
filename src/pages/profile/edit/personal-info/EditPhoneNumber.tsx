import {
  Button,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputAdornment,
  SelectChangeEvent,
  Grid,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { PhoneCodesByCountry } from '../../constants.types';
import { DEFAULT_COUNTRY, PHONE_CODES_BY_COUNTRY } from '../../constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import { phoneNumLengthRegEx } from '../../../../utils';
import { useAppSelector } from '../../../../hooks/redux-hooks';
import useEditAccountMutation from '../../../../api/mutations/account/useEditAccountMutation';
import { getProfile } from '../../../../stores/slices/authSlice';

const PhoneNumber = ({ collapsePanel }: { collapsePanel: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phoneNumber: string }>();

  const profileId = useAppSelector(getProfile)?.id ?? '';
  const { mutate } = useEditAccountMutation(profileId);

  const [selectedCountry, setSelectedCountry] = useState<PhoneCodesByCountry>(DEFAULT_COUNTRY);

  const handleCountryChange = useCallback((e: SelectChangeEvent<string>) => {
    const selectedCountryName = e.target.value;
    const country = PHONE_CODES_BY_COUNTRY.find((country) => country.name === selectedCountryName);

    if (country) setSelectedCountry(country);
  }, []);

  const onSubmit: SubmitHandler<{ phoneNumber: string }> = (data) => {
    const phoneNumber = selectedCountry.code + data.phoneNumber;
    mutate({ phoneNumber });

    collapsePanel();
  };

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        Add a number so confirmed guests and Airbnb can get in touch. You can add other numbers and
        choose how they’re used.
      </Typography>

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <Grid container spacing={4} mt={{ xs: 2, md: 4 }} mb={6}>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="edit-number-country-select-label">Coutry</InputLabel>
              <Select
                value={selectedCountry.name}
                onChange={handleCountryChange}
                labelId="edit-number-country-select-label"
                label="Country"
              >
                {PHONE_CODES_BY_COUNTRY.map((country, index) => (
                  <MenuItem key={index} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              {...register('phoneNumber', {
                required: 'This field is required',
                pattern: {
                  value: phoneNumLengthRegEx(selectedCountry.numLength),
                  message: 'Please enter a valid phone number',
                },
              })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
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
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant={'contained'}
          size="small"
          sx={{ display: 'block', fontWeight: 600, ml: 'auto' }}
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default PhoneNumber;
