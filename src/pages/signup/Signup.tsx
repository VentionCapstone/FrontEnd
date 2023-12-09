import { Box, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ButtonPrimary from '../../components/ButtonPrimary';
import InputForm from '../../components/InputForm';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import type { SubmitHandler } from 'react-hook-form';
import PasswordInput from '../../components/PasswordInput';

export type TFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<TFormData> = async (data: TFormData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', data);
      console.log(response.data);

      if (data.password !== data.confirmPassword) {
        console.log('passwords do not match');
      }
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            />
            <PasswordInput
              name="confirmPassword"
              label="Confirm password"
              placeholder="Confirm password"
              control={control}
              confirmPassword={watch('password')}
            />
          </Box>
          <ButtonPrimary>Sign up</ButtonPrimary>
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
