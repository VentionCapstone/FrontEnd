import Box from '@mui/material/Box';
import Container, { ContainerProps } from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { footerStyles } from './footerStyles';
import { useTheme } from '@mui/material';
import { PRIMARY_LIGHT_THEME } from '../../theme/themeTokens';

export const Footer = ({ maxWidth }: { maxWidth: ContainerProps['maxWidth'] }) => {
  const mode = useTheme().palette.mode;
  return (
    <Box sx={footerStyles.footer} bgcolor={mode === 'light' ? '#F7F7F7' : PRIMARY_LIGHT_THEME}>
      <Container
        maxWidth={maxWidth}
        disableGutters
        sx={{ px: '1.5rem', pt: '1rem', pb: { xs: '4.5rem', md: '1rem' } }}
      >
        <Stack direction={{ md: 'row' }} gap={{ xs: '1rem', md: '1.5rem' }}>
          <Typography variant={'sm'}>Terms</Typography>
          <Typography variant={'sm'}>Sitemap</Typography>
          <Typography variant={'sm'}>Privacy</Typography>
          <Typography variant={'sm'}>Your Privacy Choices</Typography>
          <Typography variant={'sm'} ml={{ xs: 0, md: 'auto' }}>
            © 2023 Airbnb, Inc.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
