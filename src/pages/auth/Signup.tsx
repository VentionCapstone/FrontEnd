import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import useSignupMutation from '@src/api/mutations/auth/useSignupMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import InputForm from '@src/components/input/InputForm';
import PasswordInput from '@src/components/input/PasswordInput';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { SignUpReq, signUpSchema } from '@src/types/auth.types';
import { styles } from './styles';

const Signup = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpReq>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });
  const { mutate, isPending } = useSignupMutation();

  const onSubmit = useCallback(
    (inputdata: SignUpReq) => {
      mutate(inputdata);
    },
    [mutate]
  );

  return (
    <Box sx={styles.formContainer}>
      <Typography variant="subtitle1" align="center" margin={5} fontWeight="bold">
        Sign up
      </Typography>
      <Divider />
      <Stack p={4} spacing={3}>
        <Typography variant="h5">Welcome to Airbnb</Typography>

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
            <PasswordInput
              name="confirm_password"
              label="Confirm password"
              placeholder="Confirm password"
              control={control}
              errors={errors}
            />
          </Stack>
          <ButtonPrimary loading={isPending}>Sign up</ButtonPrimary>
        </form>

        <Typography variant="subtitle2" align="center" color="secondary2.main">
          if you already have an account, please{' '}
          <Link component={RouterLink} to={ENDPOINTS.auth.signIn} sx={styles.formLink}>
            sign in
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Signup;
