import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { Profile } from '../../../../types/profile.types';
import { useAppSelector } from '../../../../hooks/redux-hooks';
import useEditAccountMutation from '../../../../api/mutations/account/useEditAccountMutation';
import { PHONE_CODES_BY_COUNTRY } from '../../constants';

const Country = ({
  collapsePanel,
  initialCountry,
}: {
  collapsePanel: () => void;
  initialCountry: Profile['country'];
}) => {
  const profileId = useAppSelector((state) => state.auth.user?.Profile?.id) ?? '';
  const { mutate } = useEditAccountMutation(profileId);

  const [country, setCountry] = useState(initialCountry);

  const handleSubmit = () => {
    if (country && country !== initialCountry) {
      mutate({ country });
    }

    collapsePanel();
  };

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        Select country
      </Typography>

      <Grid container columnSpacing={4} mt={{ xs: 2, md: 4 }} mb={6}>
        <Grid item xs={12} lg={6}>
          <FormControl size="small" fullWidth>
            <InputLabel id="user-country-select-label">Coutry</InputLabel>
            <Select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              labelId="user-country-select-label"
              label="Country"
            >
              {PHONE_CODES_BY_COUNTRY.map((country, index) => (
                <MenuItem key={index} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        onClick={handleSubmit}
        variant={'contained'}
        size="small"
        sx={{ display: 'block', fontWeight: 600, ml: 'auto' }}
      >
        Save
      </Button>
    </>
  );
};

export default Country;
