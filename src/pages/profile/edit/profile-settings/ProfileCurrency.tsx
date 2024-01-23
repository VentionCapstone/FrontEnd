import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { AccountEditPersonalInfo, SettingsInfo } from '@src/types/i18n.types';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ProfileCurrency = ({
  collapsePanel,
  userCurrency,
}: {
  collapsePanel: () => void;
  userCurrency: string;
}) => {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState<string>(userCurrency);

  const handleChange = useCallback((e: SelectChangeEvent<string>) => {
    setCurrency(e.target.value);
  }, []);

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        {t(SettingsInfo.currency_desc)}
      </Typography>

      <FormControl
        size="small"
        sx={{ display: 'block', maxWidth: '40rem', mt: { xs: 2, md: 4 }, mb: 6 }}
      >
        <InputLabel id="profile-lang-select-label">{t(SettingsInfo.currency)}</InputLabel>
        <Select
          value={currency}
          onChange={handleChange}
          fullWidth
          size="small"
          labelId="profile-lang-select-label"
          id="profile-lang-select"
          label={t(SettingsInfo.currency_desc)}
        >
          <MenuItem value={'USD'}> {t(SettingsInfo.dollar)}</MenuItem>
          <MenuItem value={'CD'}> {t(SettingsInfo.can_dollar)}</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        {t(AccountEditPersonalInfo.save_name)}
      </Button>
    </>
  );
};
