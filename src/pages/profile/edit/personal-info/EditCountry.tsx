import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';

import useEditAccountMutation from '@src/api/mutations/account/useEditAccountMutation';
import { useAppSelector } from '@src/hooks/redux-hooks';
import i18n from '@src/i18n/i18n';
import { getProfile } from '@src/stores/slices/authSlice';
import { AccountEditPersonalInfo } from '@src/types/i18n.types';
import { Profile } from '@src/types/profile.types';
import { PHONE_CODES_BY_COUNTRY } from '../../constants';

const Country = ({
  collapsePanel,
  initialCountry,
}: {
  collapsePanel: () => void;
  initialCountry: Profile['country'] | undefined;
}) => {
  const profileId = useAppSelector(getProfile)?.id ?? '';
  const { mutate } = useEditAccountMutation(profileId);
  const [country, setCountry] = useState(initialCountry ?? '');

  const handleChange = useCallback((e: SelectChangeEvent<string>) => {
    setCountry(e.target.value);
  }, []);

  const handleSubmit = () => {
    if (country && country !== initialCountry) {
      mutate({ country });
    }

    collapsePanel();
  };

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        {i18n.t(AccountEditPersonalInfo.select_country)}
      </Typography>

      <Grid container columnSpacing={4} mt={{ xs: 2, md: 4 }} mb={6}>
        <Grid item xs={12} lg={6}>
          <FormControl size="small" fullWidth>
            <InputLabel id="user-country-select-label">Coutry</InputLabel>
            <Select
              value={country}
              onChange={handleChange}
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
        {i18n.t(AccountEditPersonalInfo.save_location)}
      </Button>
    </>
  );
};

export default Country;
