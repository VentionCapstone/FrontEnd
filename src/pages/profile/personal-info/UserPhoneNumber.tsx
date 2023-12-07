import {
  Button,
  InputLabel,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useState } from 'react';

export const PhoneNumber = ({ collapsePanel }: { collapsePanel: () => void }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'}>
        Add a number so confirmed guests and Airbnb can get in touch. You can add other numbers and
        choose how they’re used.
      </Typography>

      <Stack gap={4} my={4} sx={{ maxWidth: '40rem' }}>
        <FormControl>
          <InputLabel id="number-country-select-label">Coutry</InputLabel>
          <Select
            fullWidth
            size="small"
            value={'Uzbekistan'}
            labelId="number-country-select-label"
            id="number-country-select"
            label="Country"
            sx={{ maxWidth: '40rem' }}
          >
            <MenuItem value={'Uzbekistan'}>Uzbekistan</MenuItem>
            <MenuItem>Russia</MenuItem>
            <MenuItem>Kazakhstan</MenuItem>
          </Select>
        </FormControl>

        <TextField
          value={inputValue}
          onChange={handleInputChange}
          fullWidth
          type="text"
          size="small"
          label="Phone number"
          name="phone-number-update"
          InputProps={{
            startAdornment: <InputAdornment position="start">+998</InputAdornment>,
          }}
        />
      </Stack>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Save
      </Button>
    </>
  );
};
