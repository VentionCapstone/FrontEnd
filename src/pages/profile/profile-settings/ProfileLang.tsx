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

export const ProfileLang = ({
  collapsePanel,
  userLang,
}: {
  collapsePanel: () => void;
  userLang: string;
}) => {
  const [currency, setCurrency] = useState<string>(userLang);
  return (
    <Stack gap={4}>
      <Typography variant={'sm'} color={'secondary2.main'}>
        This updates what you read on Airbnb, and how we communicate with you.
      </Typography>

      <FormControl size="small" sx={{ maxWidth: '40rem' }}>
        <InputLabel id="profile-lang-select-label">Language</InputLabel>
        <Select
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
          fullWidth
          size="small"
          labelId="profile-lang-select-label"
          id="profile-lang-select"
          label="Language"
          sx={{ maxWidth: '40rem' }}
        >
          <MenuItem value={'English'}>English</MenuItem>
          <MenuItem value={'Russian'}>Russian</MenuItem>
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
