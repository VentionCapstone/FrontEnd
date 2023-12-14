import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
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
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        Select currency you prefer
      </Typography>

      <FormControl
        size="small"
        sx={{ display: 'block', maxWidth: '40rem', mt: { xs: 2, md: 4 }, mb: 6 }}
      >
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
          <MenuItem value={'USD'}>US Dollars</MenuItem>
          <MenuItem value={'CD'}>Canadian Dollars</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Save
      </Button>
    </>
  );
};
