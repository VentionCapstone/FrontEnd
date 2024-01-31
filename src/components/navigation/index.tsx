import { IconButton, MenuItem, Paper, Popper } from '@mui/material';
import Box from '@mui/material/Box';
import Container, { ContainerProps } from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LanguageIcon from '@mui/icons-material/Language';
import { SelectChangeEvent } from '@mui/material';
import logo from '@src/assets/logo.png';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { ROUTES } from '@src/config/routes.config';
import { LANGUAGE_LIST, PROJECT_NAME } from '@src/constants';
import useIntersectionObserver from '@src/hooks/useIntersectionObserver';
import i18n from '@src/i18n/i18n';
import { setValueToLocalStorage } from '@src/utils';
import { useTranslation } from 'react-i18next';
import { BottomNav } from './BottomNavigation';
import { TopNavMenu } from './TopNavMenu';
import { mainNavigationStyles as styles } from './mainNavigation.styles';
function MainNavigation({ maxWidth }: { maxWidth: ContainerProps['maxWidth'] }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();
  const scrollWatcherRef = useRef<Element | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [language, setLanguage] = useState('english');
  const [openLanguageMenu, setOpenLanguageMenu] = useState(false);

  const { entry } = useIntersectionObserver(scrollWatcherRef);
  const dinamicShadow = entry?.isIntersecting ? 'none' : '0px 6px 16px rgba(0, 0, 0, 0.12)';

  const handleChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      const selectedLanguage = e.target.value;
      setLanguage(selectedLanguage);

      // Update language in i18n
      void i18n.changeLanguage(selectedLanguage).then(() => {
        // Set the language in local storage after successful language change
        setValueToLocalStorage(LOCAL_STORAGE_KEYS.language, selectedLanguage);
      });
    },
    [i18n]
  );

  const handleIconButtonClick = () => {
    setOpenLanguageMenu((prev) => !prev);
  };

  const handleLanguageMenuClose = () => {
    setOpenLanguageMenu(false);
  };

  return (
    <>
      {/* Scroll watcher element */}
      <Box ref={scrollWatcherRef}></Box>

      <Box sx={styles.navigation} boxShadow={dinamicShadow}>
        <Container maxWidth={maxWidth} disableGutters sx={{ px: '1.5rem', py: '1rem' }}>
          <Stack direction={'row'} alignItems={'center'}>
            <Link
              component={RouterLink}
              to={ROUTES.root}
              sx={{ textDecoration: 'none' }}
              mr={'auto'}
            >
              <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                <Box
                  src={logo}
                  component={'img'}
                  sx={{ width: '2.2rem', height: '2.2rem', objectFit: 'contain' }}
                />

                <Typography
                  variant={'xl'}
                  fontWeight={800}
                  color={'secondary.main'}
                  lineHeight={'1.5rem'}
                >
                  {PROJECT_NAME}
                </Typography>
              </Stack>
            </Link>

            <IconButton
              aria-label="global-settings"
              onClick={handleIconButtonClick}
              sx={{ mr: 4, color: 'secondary.main', padding: 1 }}
            >
              <LanguageIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>

            <Popper
              open={openLanguageMenu}
              anchorEl={scrollWatcherRef.current}
              placement="bottom-end"
              sx={styles.navigation}
            >
              <Paper
                sx={{
                  position: 'fixed',
                  right: 240,
                  top: 80,
                  zIndex: 100,
                }}
                elevation={3}
              >
                <Stack>
                  {LANGUAGE_LIST.map((lang) => (
                    <MenuItem
                      key={lang.code}
                      value={lang.code}
                      onClick={() => {
                        handleChange({ target: { value: lang.code } } as SelectChangeEvent<string>);
                        handleLanguageMenuClose();
                      }}
                    >
                      {lang.name}
                    </MenuItem>
                  ))}
                </Stack>
              </Paper>
            </Popper>

            <TopNavMenu />
          </Stack>
        </Container>
      </Box>

      <BottomNav />
    </>
  );
}
export default MainNavigation;
