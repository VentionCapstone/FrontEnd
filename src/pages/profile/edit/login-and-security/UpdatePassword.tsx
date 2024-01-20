import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';

import useUpdatePasswordMutation from '@src/api/mutations/account/useUpdatePasswordMutation';
import i18n from '@src/i18n/i18n';
import { LoginAndSecurityInfo } from '@src/types/i18n.types';
import { UpdatePasswordData, updatePasswordSchema } from '@src/types/profile.types';

export const UpdatePassword = ({ collapsePanel }: { collapsePanel: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const { mutate } = useUpdatePasswordMutation();

  const onSubmit = (inputData: UpdatePasswordData) => {
    mutate({ oldPassword: inputData.currentPassword, newPassword: inputData.newPassword });

    reset();
    collapsePanel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4} mt={3} mb={6} maxWidth={'40rem'}>
        <TextField
          {...register('currentPassword')}
          fullWidth
          required
          label={`${i18n.t(LoginAndSecurityInfo.password_current)}`}
          type={'password'}
          size="small"
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
        />

        <TextField
          {...register('newPassword')}
          fullWidth
          required
          label={`${i18n.t(LoginAndSecurityInfo.password_new_password)}`}
          type={'password'}
          size="small"
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
        />

        <TextField
          {...register('confirmPassword')}
          fullWidth
          required
          label={`${i18n.t(LoginAndSecurityInfo.password_confirm)}`}
          type={'password'}
          size="small"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
      </Stack>

      <Button type="submit" variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        {i18n.t(LoginAndSecurityInfo.password_change_btn)}
      </Button>
    </form>
  );
};
