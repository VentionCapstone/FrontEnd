import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

export const ProfileLang = ({ collapsePanel }: { collapsePanel: () => void }) => {
  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'}>
        This updates what you read on Airbnb, and how we communicate with you.
      </Typography>

      <FormControl sx={{ display: 'block', my: 4 }}>
        <InputLabel id="profile-lang-select-label">Language</InputLabel>
        <Select
          fullWidth
          size="small"
          value={'English'}
          labelId="profile-lang-select-label"
          id="profile-lang-select"
          label="Language"
          sx={{ maxWidth: '40rem' }}
        >
          <MenuItem value={'English'}>English</MenuItem>
          <MenuItem value={'Russian'}>Russian</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Save
      </Button>
    </>
  );
};
