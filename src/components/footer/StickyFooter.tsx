import Box from '@mui/material/Box';
import Container, { ContainerProps } from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { footerStyles } from './footerStyles';
import { useTheme } from '@mui/material';
import { PRIMARY_LIGHT_THEME } from '../../theme/themeTokens';

export const StickyFooter = ({ maxWidth }: { maxWidth: ContainerProps['maxWidth'] }) => {
  const mode = useTheme().palette.mode;
  return (
    <Box
      sx={footerStyles.stickyFooter}
      bgcolor={mode === 'light' ? 'background.default' : PRIMARY_LIGHT_THEME}
    >
      <Container maxWidth={maxWidth} disableGutters sx={{ px: '1.5rem', py: '0.75rem' }}>
        <Stack direction={'row'} gap={'1.5rem'} ml={'auto'}>
          <Typography variant={'sm'}>Terms</Typography>
          <Typography variant={'sm'}>Sitemap</Typography>
          <Typography variant={'sm'}>Privacy</Typography>
          <Typography variant={'sm'}>Your Privacy Choices</Typography>
          <Typography variant={'sm'} ml={'auto'}>
            © 2023 Airbnb, Inc.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
