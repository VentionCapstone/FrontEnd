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
import ForgotPasswordModal from './components/ForgotPasswordModal';
import GoogleLoginButton from './components/GoogleLoginButton';
import { styles } from './styles';

const SignIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        Sign In
      </Typography>
      <Divider />
      <Stack p={4} spacing={2}>
        <Typography variant="h5">Please login</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={3}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputForm
                  {...field}
                  type="email"
                  placeholder="Email"
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Password"
              control={control}
              errors={errors}
            />
          </Stack>
          <ButtonPrimary type="submit" loading={isPending}>
            Sign in
          </ButtonPrimary>
        </form>

        <Box sx={styles.formForgotPasswordContainer}>
          <Button sx={styles.formForgotPasswordButton} onClick={handleModal}>
            Forgot Password?
          </Button>
        </Box>
        <Typography variant="subtitle2" align="center" color="secondary2.main">
          If you do not have an account, please{' '}
          <Link component={RouterLink} to={ENDPOINTS.auth.signUp} sx={styles.formLink}>
            sign up
          </Link>
        </Typography>
      </Stack>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <ForgotPasswordModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}

      <GoogleLoginButton />
    </Box>
  );
};

export default SignIn;
