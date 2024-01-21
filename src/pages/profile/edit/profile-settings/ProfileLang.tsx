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

export const ProfileLang = ({
  collapsePanel,
  userLang,
}: {
  collapsePanel: () => void;
  userLang: string;
}) => {
  const { t } = useTranslation();
  const [lang, setLang] = useState<string>(userLang);

  const handleChange = useCallback((e: SelectChangeEvent<string>) => {
    setLang(e.target.value);
  }, []);

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        {t(SettingsInfo.lang_desc)}
      </Typography>

      <FormControl
        size="small"
        sx={{ display: 'block', maxWidth: '40rem', mt: { xs: 2, md: 4 }, mb: 6 }}
      >
        <InputLabel id="profile-lang-select-label">{t(SettingsInfo.language)}</InputLabel>
        <Select
          value={lang}
          onChange={handleChange}
          fullWidth
          size="small"
          labelId="profile-lang-select-label"
          id="profile-lang-select"
          label={t(SettingsInfo.language)}
          sx={{ maxWidth: '40rem' }}
        >
          <MenuItem value={'English'}>{t(SettingsInfo.english)}</MenuItem>
          <MenuItem value={'Russian'}>{t(SettingsInfo.russian)}</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        {t(AccountEditPersonalInfo.save_name)}
      </Button>
    </>
  );
};
