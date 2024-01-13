import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import useResetPasswordMutation from '@src/api/mutations/auth/useResetPasswordMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import PasswordInput from '@src/components/input/PasswordInput';
import { ResetPasswordReq, resetPasswordSchema } from '@src/types/auth.types';
import { styles } from './styles';

function ResetPassword() {
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
        Update password
      </Typography>

      <Divider />

      <Stack p={4} spacing={3}>
        <Typography>Enter your new password below to reset your password.</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={3}>
            <PasswordInput
              name="newPassword"
              label="Password"
              placeholder="Password"
              control={control}
              errors={errors}
            />
            <PasswordInput
              name="confirmPassword"
              label="Re-enter your password"
              placeholder="Re-enter your password"
              control={control}
              errors={errors}
            />
          </Stack>

          <ButtonPrimary loading={isPending}>Update</ButtonPrimary>
        </form>
      </Stack>
    </Box>
  );
}

export default ResetPassword;
