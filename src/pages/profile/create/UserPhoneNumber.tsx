import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { PHONE_CODES_BY_COUNTRY } from '@src/constants';
import { PhoneCodesByCountry } from '@src/constants/constant.types';
import { CreateProfileForm, ErrorTypes } from '@src/types/i18n.types';
import { Profile } from '@src/types/profile.types';
import { phoneNumLengthRegEx } from '@src/utils';
import { useTranslation } from 'react-i18next';

function UserPhoneNumber({
  register,
  errors,
  selectedCountry,
  setSelectedCountry,
}: {
  register: UseFormRegister<Profile>;
  errors: FieldErrors<Profile>;
  selectedCountry: PhoneCodesByCountry;
  setSelectedCountry: React.Dispatch<React.SetStateAction<PhoneCodesByCountry>>;
}) {
  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    const selectedCountryName = e.target.value;
    const country = PHONE_CODES_BY_COUNTRY.find((country) => country.name === selectedCountryName);

    if (country) setSelectedCountry(country);
  };
  const { t } = useTranslation();

  return (
    <Box>
      <Typography fontWeight={600} mb={{ xs: 3, md: 4 }}>
        {t(CreateProfileForm.phone_number)}
      </Typography>

      <Stack gap={4} direction={{ md: 'row' }}>
        <FormControl fullWidth size="small">
          <InputLabel id="number-country-select-label">{t(CreateProfileForm.country)}</InputLabel>
          <Select
            value={selectedCountry.name}
            onChange={handleCountryChange}
            labelId="number-country-select-label"
            id="number-country-select"
            label="Country"
          >
            {PHONE_CODES_BY_COUNTRY.map((country) => (
              <MenuItem key={country.name} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box width={'100%'}>
          <TextField
            {...register('phoneNumber', {
              required: `${t(ErrorTypes.field_is_required)}`,
              pattern: {
                value: phoneNumLengthRegEx(selectedCountry.numLength),
                message: `${t(ErrorTypes.enter_valid_phone_number)}`,
              },
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            fullWidth
            size="small"
            label={t(CreateProfileForm.phone_number)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+{selectedCountry.code}</InputAdornment>
              ),
              inputProps: { maxLength: selectedCountry.numLength },
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default UserPhoneNumber;
