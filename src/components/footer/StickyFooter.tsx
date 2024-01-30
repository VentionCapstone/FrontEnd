import Box from '@mui/material/Box';
import Container, { ContainerProps } from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { PROJECT_NAME } from '@src/constants';
import { HomeUIInfo } from '@src/types/i18n.types';
import { footerStyles } from './footerStyles';

export const StickyFooter = ({ maxWidth }: { maxWidth: ContainerProps['maxWidth'] }) => {
  const { t } = useTranslation();
  return (
    <Box sx={footerStyles.stickyFooter}>
      <Container maxWidth={maxWidth} disableGutters sx={{ px: '1.5rem', py: '0.75rem' }}>
        <Stack direction={'row'} gap={'1.5rem'}>
          <Typography variant={'sm'} color={'secondary2.main'}>
            {t(HomeUIInfo.footer_info_terms)}
          </Typography>
          <Typography variant={'sm'} color={'secondary2.main'}>
            {t(HomeUIInfo.footer_info_sitemap)}
          </Typography>
          <Typography variant={'sm'} color={'secondary2.main'}>
            {t(HomeUIInfo.footer_info_privacy)}
          </Typography>
          <Typography variant={'sm'} color={'secondary2.main'}>
            {t(HomeUIInfo.footer_info_your_privacy_choices)}
          </Typography>
          <Typography variant={'sm'} color={'secondary2.main'} ml={'auto'}>
            {t(HomeUIInfo.footer_info_copyright, { name: PROJECT_NAME })}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
