import ErrorTypes from '@/errors/errors.enum';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function DataFetchError({
  errorKey = ErrorTypes.DEFAULT,
  position = 'center',
}: {
  errorKey?: string;
  position?: 'start' | 'center' | 'end';
}) {
  const { t } = useTranslation();
  const error = t(errorKey);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: position,
        alignItems: 'center',
      }}
    >
      <Typography>{error}</Typography>
    </Box>
  );
}

export default DataFetchError;
