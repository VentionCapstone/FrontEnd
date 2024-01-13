import LanguageIcon from '@mui/icons-material/Language';
import Box from '@mui/material/Box';
import Container, { ContainerProps } from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import logo from '@src/assets/logo.png';
import { ROUTES } from '@src/config/routes.config';
import useIntersectionObserver from '@src/hooks/useIntersectionObserver';
import { BottomNav } from './BottomNavigation';
import { TopNavMenu } from './TopNavMenu';
import { mainNavigationStyles as styles } from './mainNavigation.styles';

function MainNavigation({ maxWidth }: { maxWidth: ContainerProps['maxWidth'] }) {
  const scrollWatcherRef = useRef<Element | null>(null);
  const { entry } = useIntersectionObserver(scrollWatcherRef);

  const dinamicShadow = entry?.isIntersecting ? 'none' : '0px 6px 16px rgba(0, 0, 0, 0.12)';

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
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Box
                  src={logo}
                  component={'img'}
                  sx={{ width: '2rem', height: '2rem', objectFit: 'contain' }}
                />
                <Typography variant={'xl'} fontWeight={800} color={'secondary.main'}>
                  airbnb
                </Typography>
              </Stack>
            </Link>

            <IconButton aria-label="global-settings" sx={{ mr: 4, color: 'secondary2.main' }}>
              <LanguageIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>

            <TopNavMenu />
          </Stack>
        </Container>
      </Box>

      <BottomNav />
    </>
  );
}
export default MainNavigation;
