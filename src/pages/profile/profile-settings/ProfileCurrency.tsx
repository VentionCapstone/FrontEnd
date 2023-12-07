import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

export const ProfileCurrency = ({ collapsePanel }: { collapsePanel: () => void }) => {
  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'}>
        Select currency you prefer
      </Typography>

      <FormControl sx={{ display: 'block', my: 4 }}>
        <InputLabel id="profile-lang-select-label">Currency</InputLabel>
        <Select
          fullWidth
          size="small"
          value={'US Dollar'}
          labelId="profile-lang-select-label"
          id="profile-lang-select"
          label="Currency"
          sx={{ maxWidth: '40rem' }}
        >
          <MenuItem value={'US Dollar'}>US Dollar</MenuItem>
          <MenuItem value={'Canadian Dollar'}>Canadian Dollarsian</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Save
      </Button>
    </>
  );
};
