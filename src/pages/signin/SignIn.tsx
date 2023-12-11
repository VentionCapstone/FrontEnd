import { Box, Divider, Stack, Typography } from '@mui/material';
import ButtonPrimary from '../../components/ButtonPrimary';
import InputForm from '../../components/InputForm';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PasswordInput from '../../components/PasswordInput';
import httpClient from '../../api/httpClient';
import { AuthData, LoginResponse } from '../../types/auth.types';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { setToken } from '../../stores/slices/authSlice';
import { useState } from 'react';

const SignIn = () => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<AuthData> = async (data: AuthData) => {
    try {
      if (isPasswordValid) {
        setIsLoading(true);
        const response = await httpClient.post<LoginResponse>('/auth/signin', data);
        localStorage.setItem('sub', response.data.id);
        setIsLoading(false);
        dispatch(setToken(response.data.tokens.access_token));
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Box sx={{ mx: 'auto', mt: '100px', border: '1px solid #b0b0b0', borderRadius: 2 }}>
      <Typography variant="subtitle1" align="center" margin={2} fontWeight="bold">
        Sign In
      </Typography>
      <Divider />
      <Stack p={4} spacing={2}>
        <Typography variant="h5">Please login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={1}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputForm
                  {...field}
                  type="email"
                  placeholder="Email"
                  label="Email"
                  required={true}
                />
              )}
            />
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Password"
              control={control}
              setIsPasswordValid={setIsPasswordValid}
            />
          </Stack>
          <ButtonPrimary loading={isLoading} disbabled={isPasswordValid}>
            Sign in
          </ButtonPrimary>
        </form>
      </Stack>
    </Box>
  );
};

export default SignIn;
