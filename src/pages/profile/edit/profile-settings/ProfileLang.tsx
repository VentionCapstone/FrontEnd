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

export const ProfileLang = ({
  collapsePanel,
  userLang,
}: {
  collapsePanel: () => void;
  userLang: string;
}) => {
  const [lang, setLang] = useState<string>(userLang);

  const handleChange = useCallback((e: SelectChangeEvent<string>) => {
    setLang(e.target.value);
  }, []);

  return (
    <>
      <Typography variant={'sm'} color={'secondary2.main'} mt={1}>
        {i18n.t(SettingsInfo.lang_desc)}
      </Typography>

      <FormControl
        size="small"
        sx={{ display: 'block', maxWidth: '40rem', mt: { xs: 2, md: 4 }, mb: 6 }}
      >
        <InputLabel id="profile-lang-select-label">Language</InputLabel>
        <Select
          value={lang}
          onChange={handleChange}
          fullWidth
          size="small"
          labelId="profile-lang-select-label"
          id="profile-lang-select"
          label="Language"
          sx={{ maxWidth: '40rem' }}
        >
          <MenuItem value={'English'}>{i18n.t(SettingsInfo.english)}</MenuItem>
          <MenuItem value={'Russian'}>{i18n.t(SettingsInfo.russian)}</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={collapsePanel} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        {i18n.t(AccountEditPersonalInfo.save_name)}
      </Button>
    </>
  );
};
