import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo, useState } from 'react';

import useEditAccountMutation from '@src/api/mutations/account/useEditAccountMutation';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { getProfile } from '@src/stores/slices/authSlice';
import { ThemeMode } from '@src/types/profile.types';
import { convertCodeToLanguage, getValueFromLocalStorage } from '@src/utils';
import { DEFAULT_LANGUAGE } from '../../constants';
import EditablePanel from '../EditablePanel';
import { ProfileCurrency } from './ProfileCurrency';
import { ProfileLang } from './ProfileLang';

function ProfileSettings() {
  const profile = useAppSelector(getProfile);
  const { language: userLang, id: profileId } = profile ?? {};

  const { mutate } = useEditAccountMutation(profileId ?? '');

  const uiTheme = useMemo(
    () => getValueFromLocalStorage<ThemeMode>(LOCAL_STORAGE_KEYS.uiTheme),
    []
  );

  const [theme, setTheme] = useState<ThemeMode>(uiTheme ?? ThemeMode.light);
  const language = useMemo(() => userLang || DEFAULT_LANGUAGE.code, [userLang]);

  const handleThemeChange = (e: SelectChangeEvent<ThemeMode>) => {
    const mode = e.target.value as ThemeMode;
    setTheme(mode);
    mutate({ uiTheme: mode });
  };
  const languageRenderProps = useCallback(
    (data: () => void) => <ProfileLang collapsePanel={data} userLang={language} />,
    [language]
  );

  const currencyRenderProps = useCallback(
    (data: () => void) => <ProfileCurrency collapsePanel={data} userCurrency="USD" />,
    []
  );

  return (
    <>
      <Typography
        mb={{ xs: 4, md: 6, lg: 10 }}
        fontSize={{ xs: '1.5rem', md: '2rem' }}
        fontWeight={800}
        component={'h1'}
      >
        Settings
      </Typography>

      <Box maxWidth={'60rem'}>
        <Stack
          py={4}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderBottom={'1px solid'}
          borderTop={'1px solid'}
          borderColor={'secondary2.light'}
        >
          <Typography fontWeight={600}>Theme</Typography>
          <FormControl>
            <Select
              value={theme}
              onChange={handleThemeChange}
              size="small"
              labelId="profile-theme-select-label"
              id="profile-theme-select-label"
            >
              <MenuItem value={ThemeMode.light}>Light</MenuItem>
              <MenuItem value={ThemeMode.dark}>Dark</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <EditablePanel
          panelHeading={'Preferred language'}
          initial={
            <Typography variant={'sm'} color={'secondary2.main'}>
              {convertCodeToLanguage(language)}
            </Typography>
          }
          editable={languageRenderProps}
        />

        <EditablePanel
          panelHeading={'Preferred currency'}
          initial={
            <Typography variant={'sm'} color={'secondary2.main'}>
              US Dollars
            </Typography>
          }
          editable={currencyRenderProps}
        />
      </Box>
    </>
  );
}

export default ProfileSettings;
