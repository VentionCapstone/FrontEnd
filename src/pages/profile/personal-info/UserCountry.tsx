import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

export const Country = ({ collapsePanel }: { collapsePanel: () => void }) => {
  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'}>
        Select country
      </Typography>

      <FormControl sx={{ display: 'block', my: 4 }}>
        <InputLabel id="user-country-select-label">Coutry</InputLabel>
        <Select
          fullWidth
          size="small"
          value={'Uzbekistan'}
          labelId="user-country-select-label"
          id="user-country-select"
          label="Country"
          sx={{ maxWidth: '40rem' }}
        >
          <MenuItem value={'Uzbekistan'}>Uzbekistan</MenuItem>
          <MenuItem>Russia</MenuItem>
          <MenuItem>Kazakhstan</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Save
      </Button>
    </>
  );
};
