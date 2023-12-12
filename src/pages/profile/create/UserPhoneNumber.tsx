import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Profile } from '../../../types/profile.types';
import { PHONE_CODES_BY_COUNTRY } from '../constants';
import { PhoneCodesByCountry } from '../constants.types';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

const phoneNumLengthRegEx = (length: number) => {
  return new RegExp(`^\\d{${length}}$`);
};

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
  return (
    <Box>
      <Typography fontWeight={600} mb={{ xs: 3, md: 4 }}>
        Phone number
      </Typography>

      <Stack gap={4} direction={{ md: 'row' }}>
        <FormControl fullWidth size="small">
          <InputLabel id="number-country-select-label">Coutry</InputLabel>
          <Select
            value={selectedCountry.name}
            onChange={(e) => {
              const selectedCountryName = e.target.value;
              const country = PHONE_CODES_BY_COUNTRY.find((c) => c.name === selectedCountryName);

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
                value: phoneNumLengthRegEx(selectedCountry.numLength),
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
  );
}

export default UserPhoneNumber;
