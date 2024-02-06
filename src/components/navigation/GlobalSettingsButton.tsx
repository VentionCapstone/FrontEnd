import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, List, ListItem, ListItemButton, Popover } from '@mui/material';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import useEditAccountMutation from '@src/api/mutations/account/useEditAccountMutation';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { LANGUAGE_LIST } from '@src/constants';
import { LanguageCollection } from '@src/constants/constant.types';
import { useAppSelector } from '@src/hooks/redux-hooks';
import i18n from '@src/i18n/i18n';
import { ErrorTypes } from '@src/types/i18n.types';
import { setValueToLocalStorage } from '@src/utils';
import { getProfile } from '@src/stores/slices/authSlice';

const GlobalSettingsButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const profile = useAppSelector(getProfile);
  const profileId = profile?.id ?? '';
  const { mutate } = useEditAccountMutation(profileId);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLangChange = useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const dataset = event.currentTarget.dataset;
      const code = dataset.code as LanguageCollection['code'];

      try {
        if (profile && code !== profile?.language) {
          mutate({ language: code });
        }

        await i18n.changeLanguage(code);
        setAnchorEl(null);
        setValueToLocalStorage(LOCAL_STORAGE_KEYS.language, code);
      } catch (error) {
        console.error(error);
        toast.error(t(ErrorTypes.language_update));
      }
    },
    [profile, mutate, t]
  );

  return (
    <>
      <IconButton
        aria-label="global-settings"
        onClick={handleOpen}
        sx={{ mr: 4, color: 'secondary.main', padding: 1 }}
      >
        <LanguageIcon sx={{ fontSize: '1.5rem' }} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          'mt': 2,
          '.MuiList-root': {
            padding: 0,
            bgcolor: 'background.default',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          {LANGUAGE_LIST.map(({ name, code }) => (
            <ListItem disablePadding key={code}>
              <ListItemButton data-code={code} onClick={handleLangChange}>
                {name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default GlobalSettingsButton;
