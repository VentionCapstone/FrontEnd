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

export const ProfileCurrency = ({
  collapsePanel,
  userCurrency,
}: {
  collapsePanel: () => void;
  userCurrency: string;
}) => {
  const [currency, setCurrency] = useState<string>(userCurrency);
  return (
    <Stack gap={4}>
      <Typography variant={'sm'} color={'secondary2.main'}>
        Select currency you prefer
      </Typography>

      <FormControl size="small" sx={{ maxWidth: '40rem' }}>
        <InputLabel id="profile-lang-select-label">Currency</InputLabel>
        <Select
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
          fullWidth
          size="small"
          labelId="profile-lang-select-label"
          id="profile-lang-select"
          label="Currency"
        >
          <MenuItem value={'USD'}>US Dollar</MenuItem>
          <MenuItem value={'CD'}>Canadian Dollarsian</MenuItem>
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
