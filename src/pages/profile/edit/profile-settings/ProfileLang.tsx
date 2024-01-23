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

import useEditAccountMutation from '@src/api/mutations/account/useEditAccountMutation';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { getProfile } from '@src/stores/slices/authSlice';
import { setValueToLocalStorage } from '@src/utils';
import { LANGUAGE_LIST } from '../../constants';

export const ProfileLang = ({
  collapsePanel,
  userLang,
}: {
  collapsePanel: () => void;
  userLang: string;
}) => {
  const profileId = useAppSelector(getProfile)?.id ?? '';

  const { t } = useTranslation();
  const [language, setLanguage] = useState<string>(userLang);
  const { mutate } = useEditAccountMutation(profileId);
  const { i18n } = useTranslation();

  const handleChange = useCallback((e: SelectChangeEvent<string>) => {
    setLanguage(e.target.value);
  }, []);

  const handleSubmit = async () => {
    if (language && language !== userLang) {
      mutate({ language });
      await i18n.changeLanguage(language);
      setValueToLocalStorage(LOCAL_STORAGE_KEYS.language, language);

      collapsePanel();
    }
  };

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
          value={language}
          onChange={handleChange}
          fullWidth
          size="small"
          labelId="profile-lang-select-label"
          id="profile-lang-select"
          label={t(SettingsInfo.language)}
          sx={{ maxWidth: '40rem' }}
        >
          {LANGUAGE_LIST.map((language) => (
            <MenuItem key={language.code} value={language.code}>
              {language.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button onClick={handleSubmit} variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        {t(AccountEditPersonalInfo.save_about)}
      </Button>
    </>
  );
};
