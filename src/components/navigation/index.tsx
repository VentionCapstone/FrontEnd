import { IconButton, MenuItem, Popover } from '@mui/material';
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

  const handleLanguageMenuClose = () => {};

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
              aria-describedby={id}
              aria-label="global-settings"
              onClick={handleClick}
              sx={{ mr: 4, color: 'secondary.main', padding: 1 }}
            >
              <LanguageIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Stack>
                {LANGUAGE_LIST.map((lang) => (
                  <MenuItem
                    key={lang.code}
                    value={lang.code}
                    onClick={() => {
                      handleChange({
                        target: { value: lang.code },
                      } as SelectChangeEvent<string>);
                      handleLanguageMenuClose();
                    }}
                  >
                    {lang.name}
                  </MenuItem>
                ))}
              </Stack>
            </Popover>
            <TopNavMenu />
          </Stack>
        </Container>
      </Box>

      <BottomNav />
    </>
  );
}
export default MainNavigation;
