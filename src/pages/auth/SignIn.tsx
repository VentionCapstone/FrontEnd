import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import useSignInMutation from '@src/api/mutations/auth/useSignInMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import InputForm from '@src/components/input/InputForm';
import PasswordInput from '@src/components/input/PasswordInput';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { SignInReq, signInSchema } from '@src/types/auth.types';
import { HomeUIInfo, LoginAndSecurityInfo } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import { styles } from './styles';

const SignIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInReq>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useSignInMutation();

  const onSubmit = useCallback(
    (inputData: SignInReq) => {
      mutate(inputData);
    },
    [mutate]
  );

  const handleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <Box sx={styles.formContainer}>
      <Typography variant="subtitle1" align="center" margin={5} fontWeight="bold">
        {t(HomeUIInfo.sign_in_sing_title)}
      </Typography>
      <Divider />
      <Stack p={4} spacing={2}>
        <Typography variant="h5">{t(HomeUIInfo.sign_in_title)}</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={3}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputForm
                  {...field}
                  type="email"
                  placeholder={t(LoginAndSecurityInfo.email)}
                  label={t(LoginAndSecurityInfo.email)}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <PasswordInput
              name="password"
              label={t(LoginAndSecurityInfo.password)}
              placeholder={t(LoginAndSecurityInfo.password)}
              control={control}
              errors={errors}
            />
          </Stack>
          <ButtonPrimary type="submit" loading={isPending}>
            {t(HomeUIInfo.sign_in_sing_title)}
          </ButtonPrimary>
        </form>

        <Box sx={styles.formForgotPasswordContainer}>
          <Button sx={styles.formForgotPasswordButton} onClick={handleModal}>
            {t(HomeUIInfo.sign_in_forgot_password)}
          </Button>
        </Box>
        <Typography variant="subtitle2" align="center" color="secondary2.main">
          {t(HomeUIInfo.sing_out_sing_title)}{' '}
          <Link component={RouterLink} to={ENDPOINTS.auth.signUp} sx={styles.formLink}>
            {t(HomeUIInfo.sing_out_sing_up_btn)}
          </Link>
        </Typography>
      </Stack>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <ForgotPasswordModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </Box>
  );
};

export default SignIn;
