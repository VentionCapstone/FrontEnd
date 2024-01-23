import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { CreateProfileForm, ErrorTypes } from '@src/types/i18n.types';
import { Profile } from '@src/types/profile.types';
import { useTranslation } from 'react-i18next';

function UserFullName({
  register,
  errors,
}: {
  register: UseFormRegister<Profile>;
  errors: FieldErrors<Profile>;
}) {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography fontWeight={600} mb={{ xs: 3, md: 4 }}>
        {t(CreateProfileForm.legal_name)}
      </Typography>

      <Stack rowGap={3} columnGap={4} direction={{ md: 'row' }}>
        <Box width={'100%'}>
          <TextField
            {...register('firstName', {
              required: `${t(ErrorTypes.field_is_required)}`,
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            fullWidth
            size="small"
            label={t(CreateProfileForm.first_name)}
          />
        </Box>

        <Box width={'100%'}>
          <TextField
            {...register('lastName', { required: `${t(ErrorTypes.field_is_required)}` })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            fullWidth
            size="small"
            label={t(CreateProfileForm.last_name)}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default UserFullName;
