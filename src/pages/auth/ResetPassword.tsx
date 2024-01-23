import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import useResetPasswordMutation from '@src/api/mutations/auth/useResetPasswordMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import PasswordInput from '@src/components/input/PasswordInput';
import { ResetPasswordReq, resetPasswordSchema } from '@src/types/auth.types';
import { ForgotPasswordReset } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

function ResetPassword() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordReq>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { mutate, isPending } = useResetPasswordMutation(token);

  const onSubmit = useCallback(
    (inputdata: ResetPasswordReq) => {
      mutate(inputdata);
    },
    [mutate]
  );

  return (
    <Box sx={styles.formContainer}>
      <Typography variant="subtitle1" align="center" margin={5} fontWeight="bold">
        {t(ForgotPasswordReset.title)}
      </Typography>

      <Divider />

      <Stack p={4} spacing={3}>
        <Typography>{t(ForgotPasswordReset.description)}</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={3}>
            <PasswordInput
              name="newPassword"
              label={t(ForgotPasswordReset.password)}
              placeholder={t(ForgotPasswordReset.password)}
              control={control}
              errors={errors}
            />
            <PasswordInput
              name="confirmPassword"
              label={t(ForgotPasswordReset.re_enter)}
              placeholder={t(ForgotPasswordReset.re_enter)}
              control={control}
              errors={errors}
            />
          </Stack>

          <ButtonPrimary loading={isPending}>{t(ForgotPasswordReset.update)}</ButtonPrimary>
        </form>
      </Stack>
    </Box>
  );
}

export default ResetPassword;
