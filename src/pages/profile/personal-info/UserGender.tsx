import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

export const Gender = ({ collapsePanel }: { collapsePanel: () => void }) => {
  return (
    <>
      <Typography variant={'sm'} color={'darkGrey.main'}>
        Select your gender
      </Typography>

      <FormControl sx={{ display: 'block', my: 4 }}>
        <InputLabel id="user-age-select-label">Age</InputLabel>
        <Select
          fullWidth
          size="small"
          value={'male'}
          labelId="user-age-select-label"
          id="user-age-select"
          label="Age"
          sx={{ maxWidth: '40rem' }}
        >
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Save
      </Button>
    </>
  );
};
