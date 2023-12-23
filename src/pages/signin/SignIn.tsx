import { Box, Divider, Stack, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import ButtonPrimary from '../../components/ButtonPrimary';
import InputForm from '../../components/InputForm';
import { AuthData } from '../../types/auth.types';
import PasswordInput from '../../components/PasswordInput';
import useSignInMutation from '../../api/mutations/auth/useSignInMutation';

const SignIn = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const { mutateAsync, isPending } = useSignInMutation();

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
        mt: '10%',
        border: '1px solid #b0b0b0',
        borderRadius: 2,
        maxWidth: '600px',
      }}
    >
      <Typography variant="subtitle1" align="center" margin={5} fontWeight="bold">
        Sign In
      </Typography>
      <Divider />
      <Stack p={4} spacing={2}>
        <Typography variant="h5">Please login</Typography>
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <Stack direction="column" spacing={3}>
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
          <ButtonPrimary loading={isPending} disabled={isPasswordValid}>
            Sign in
          </ButtonPrimary>
        </form>
      </Stack>
    </Box>
  );
};

export default SignIn;
