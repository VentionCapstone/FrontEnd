import Box from '@mui/material/Box';
import Container, { ContainerProps } from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { PROJECT_NAME } from '@src/constants';
import { HomeUIInfo } from '@src/types/i18n.types';
import { footerStyles } from './footerStyles';

export const Footer = ({ maxWidth }: { maxWidth: ContainerProps['maxWidth'] }) => {
  const { t } = useTranslation();

  return (
    <Box sx={footerStyles.footer}>
      <Container
        maxWidth={maxWidth}
        disableGutters
        sx={{ px: '1.5rem', pt: '1rem', pb: { xs: '4.5rem', md: '1rem' } }}
      >
        <Stack direction={{ md: 'row' }} gap={{ xs: '1rem', md: '1.5rem' }}>
          <Typography variant={'sm'}>{t(HomeUIInfo.footer_info_terms)}</Typography>
          <Typography variant={'sm'}>{t(HomeUIInfo.footer_info_sitemap)}</Typography>
          <Typography variant={'sm'}>{t(HomeUIInfo.footer_info_privacy)}</Typography>
          <Typography variant={'sm'}>{t(HomeUIInfo.footer_info_your_privacy_choices)}</Typography>
          <Typography variant={'sm'} ml={{ xs: 0, md: 'auto' }}>
            {t(HomeUIInfo.footer_info_copyright, { name: PROJECT_NAME })}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
