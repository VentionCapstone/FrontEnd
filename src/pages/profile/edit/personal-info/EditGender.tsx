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
import { getProfile } from '@src/stores/slices/authSlice';
import { AccountEditPersonalInfo } from '@src/types/i18n.types';
import { Gender as GenderEnum, Profile } from '@src/types/profile.types';
import { useTranslation } from 'react-i18next';

const Gender = ({
  collapsePanel,
  initialGender,
}: {
  collapsePanel: () => void;
  initialGender: Profile['gender'] | undefined;
}) => {
  const { t } = useTranslation();
  const profileId = useAppSelector(getProfile)?.id ?? '';
  const { mutate } = useEditAccountMutation(profileId);
  const [gender, setGender] = useState(initialGender ?? GenderEnum.male);

  const handleChange = useCallback((e: SelectChangeEvent<GenderEnum>) => {
    setGender(e.target.value as GenderEnum);
  }, []);

  const handleSubmit = () => {
    if (gender && gender !== initialGender) {
      mutate({ gender });
      collapsePanel();
    }
  };

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        {t(AccountEditPersonalInfo.select_gender)}
      </Typography>

      <Grid container columnSpacing={4} mt={{ xs: 2, md: 4 }} mb={6}>
        <Grid item xs={12} lg={6}>
          <FormControl size="small" fullWidth>
            <InputLabel id="user-gender-select-label">
              {t(AccountEditPersonalInfo.gender)}
            </InputLabel>
            <Select
              onChange={handleChange}
              value={gender}
              labelId="user-gender-select-label"
              id="user-gender-select"
              label="Gender"
            >
              <MenuItem value={'MALE'}> {t(AccountEditPersonalInfo.male)}</MenuItem>
              <MenuItem value={'FEMALE'}> {t(AccountEditPersonalInfo.female)}</MenuItem>
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
        {t(AccountEditPersonalInfo.save_gender)}
      </Button>
    </>
  );
};

export default Gender;
