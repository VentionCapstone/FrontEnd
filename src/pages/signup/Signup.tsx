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
import { useMutation } from '@tanstack/react-query';

const Signup = () => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: AuthData) => {
      const response = await httpClient.post<{ success: boolean; message: string }>(
        '/auth/signup',
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
  const onSubmit: SubmitHandler<AuthData> = async (Inputdata: AuthData) => {
    try {
      if (isPasswordValid) {
        await mutateAsync(Inputdata);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        mx: 'auto',
        mt: '5%',
        border: '1px solid #b0b0b0',
        borderRadius: 2,
        maxWidth: '600px',
      }}
    >
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
          <ButtonPrimary loading={isPending} disabled={isPasswordValid}>
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
