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

export const Gender = ({
  collapsePanel,
  userGender,
}: {
  collapsePanel: () => void;
  userGender: 'MALE' | 'FEMALE' | '';
}) => {
  const [gender, setGender] = useState(userGender);

  return (
    <>
      <Stack>
        <Typography variant={'sm'} color={'secondary2.main'}>
          Select your gender
        </Typography>

        <FormControl sx={{ width: '7.5rem', my: 4 }} size="small">
          <InputLabel id="user-gender-select-label">Gender</InputLabel>
          <Select
            onChange={(e) => setGender(e.target.value as typeof userGender)}
            value={gender}
            labelId="user-gender-select-label"
            id="user-gender-select"
            label="Gender"
          >
            <MenuItem value={'MALE'}>Male</MenuItem>
            <MenuItem value={'FEMALE'}>Female</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        Save
      </Button>
    </>
  );
};
