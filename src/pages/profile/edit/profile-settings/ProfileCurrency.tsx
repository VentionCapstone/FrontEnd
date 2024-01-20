import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import i18n from '@src/i18n/i18n';
import { AccountEditPersonalInfo, SettingsInfo } from '@src/types/i18n.types';
import { useCallback, useState } from 'react';

export const ProfileCurrency = ({
  collapsePanel,
  userCurrency,
}: {
  collapsePanel: () => void;
  userCurrency: string;
}) => {
  const [currency, setCurrency] = useState<string>(userCurrency);

  const handleChange = useCallback((e: SelectChangeEvent<string>) => {
    setCurrency(e.target.value);
  }, []);

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        {i18n.t(SettingsInfo.currency_desc)}
      </Typography>

      <FormControl
        size="small"
        sx={{ display: 'block', maxWidth: '40rem', mt: { xs: 2, md: 4 }, mb: 6 }}
      >
        <InputLabel id="profile-lang-select-label">Currency</InputLabel>
        <Select
          value={currency}
          onChange={handleChange}
          fullWidth
          size="small"
          labelId="profile-lang-select-label"
          id="profile-lang-select"
          label="Currency"
        >
          <MenuItem value={'USD'}> {i18n.t(SettingsInfo.dollar)}</MenuItem>
          <MenuItem value={'CD'}> {i18n.t(SettingsInfo.can_dollar)}</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        {i18n.t(AccountEditPersonalInfo.save_name)}
      </Button>
    </>
  );
};
