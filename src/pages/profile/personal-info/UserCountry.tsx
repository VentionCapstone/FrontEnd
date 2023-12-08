import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export const Country = ({
  collapsePanel,
  userCountry,
}: {
  collapsePanel: () => void;
  userCountry: string;
}) => {
  const [country, setCountry] = useState(userCountry);
  return (
    <Stack gap={4}>
      <Typography variant={'sm'} color={'secondary2.main'}>
        Select country
      </Typography>

      <FormControl size="small" sx={{ maxWidth: '40rem' }}>
        <InputLabel id="user-country-select-label">Coutry</InputLabel>
        <Select
          fullWidth
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          labelId="user-country-select-label"
          label="Country"
        >
          <MenuItem value={'Uzbekistan'}>Uzbekistan</MenuItem>
          <MenuItem value={'Russia'}>Russia</MenuItem>
          <MenuItem value={'Kazakhstan'}>Kazakhstan</MenuItem>
        </Select>
      </FormControl>

      <Button
        onClick={collapsePanel}
        variant={'contained'}
        size="small"
        sx={{ fontWeight: 600, mr: 'auto' }}
      >
        Save
      </Button>
    </Stack>
  );
};
