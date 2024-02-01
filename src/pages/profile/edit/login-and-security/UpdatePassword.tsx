import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';

import useUpdatePasswordMutation from '@src/api/mutations/account/useUpdatePasswordMutation';
import PasswordInput from '@src/components/input/PasswordInput';
import { LoginAndSecurityInfo } from '@src/types/i18n.types';
import { UpdatePasswordData, updatePasswordSchema } from '@src/types/profile.types';
import { useTranslation } from 'react-i18next';

export const UpdatePassword = ({ collapsePanel }: { collapsePanel: () => void }) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
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
        <PasswordInput
          name="currentPassword"
          label={t(LoginAndSecurityInfo.password_current)}
          placeholder={t(LoginAndSecurityInfo.password_current)}
          control={control}
          errors={errors}
          size="small"
        />

        <PasswordInput
          name="newPassword"
          label={t(LoginAndSecurityInfo.password_new_password)}
          placeholder={t(LoginAndSecurityInfo.password_new_password)}
          control={control}
          errors={errors}
          size="small"
        />

        <PasswordInput
          name="confirmPassword"
          label={t(LoginAndSecurityInfo.password_confirm)}
          placeholder={t(LoginAndSecurityInfo.password_confirm)}
          control={control}
          errors={errors}
          size="small"
        />
      </Stack>

      <Button type="submit" variant={'contained'} size="small" sx={{ fontWeight: 600 }}>
        {t(LoginAndSecurityInfo.password_change_btn)}
      </Button>
    </form>
  );
};
