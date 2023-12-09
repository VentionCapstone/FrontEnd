import { Box, Divider, Stack, Typography } from '@mui/material';
import ButtonPrimary from '../../components/ButtonPrimary';
import InputForm from '../../components/InputForm';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import PasswordInput from '../../components/PasswordInput';

type TFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<TFormData> = async (data: TFormData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', data);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
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
            />
          </Stack>
          <ButtonPrimary>Sign in</ButtonPrimary>
        </form>
      </Stack>
    </Box>
  );
};

export default SignIn;
