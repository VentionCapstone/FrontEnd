import { Box, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import PasswordInput from '../../components/PasswordInput';
import httpClient from '../../api/httpClient';
import toast from 'react-hot-toast';
import { AuthData } from '../../types/auth.types';
import ButtonPrimary from '../../components/ButtonPrimary';
import InputForm from '../../components/InputForm';

const Signup = () => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<AuthData> = async (data: AuthData) => {
    if (isPasswordValid) {
      setIsLoading(true);
      const response = await httpClient.post<{ success: boolean; message: string }>(
        '/auth/signup',
        data
      );
      toast.success(response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ mx: 'auto', mt: '100px', border: '1px solid #b0b0b0', borderRadius: 2 }}>
      <Typography variant="subtitle1" align="center" margin={2} fontWeight="bold">
        Sign up
      </Typography>
      <Divider />
      <Stack p={4} spacing={3}>
        <Typography variant="h5">Welcome to Airbnb</Typography>
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputForm {...field} type="email" placeholder="Email" label="Email" required />
              )}
            />{' '}
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Password"
              control={control}
              setIsPasswordValid={setIsPasswordValid}
            />
            <PasswordInput
              name="confirm_password"
              label="Confirm password"
              placeholder="Confirm password"
              control={control}
              confirmPassword={watch('password')}
              setIsPasswordValid={setIsPasswordValid}
            />
          </Box>
          <ButtonPrimary loading={isLoading} disbabled={isPasswordValid}>
            Sign up
          </ButtonPrimary>
        </form>
        <Typography variant="subtitle2" align="center" color="gray">
          if you already have an account, please{' '}
          <Link to="/auth/signin" style={{ fontWeight: 'bold' }}>
            login
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Signup;
