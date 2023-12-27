import { useState } from 'react';
import {
  Box,
  Divider,
  Stack,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useSignInMutation from '../../api/mutations/auth/useSignInMutation';
import { AuthData } from '../../types/auth.types';
import InputForm from '../../components/input/InputForm';
import ButtonPrimary from '../../components/button/ButtonPrimary';
import { EndpointsConfig } from '../../config/endpoints.config';

const SignIn = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useSignInMutation();

  const onSubmit: SubmitHandler<AuthData> = async (Inputdata: AuthData) => {
    try {
      await mutateAsync(Inputdata);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor={`outlined-adornment-password`}>Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    required
                    label="Password"
                    placeholder="Password"
                    id={`outlined-adornment-password`}
                    type={showPassword ? 'text' : 'password'}
                    onChange={field.onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          onMouseDown={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}
            />
          </Stack>
          <ButtonPrimary loading={isPending}>Sign in</ButtonPrimary>
        </form>
        <Typography variant="subtitle2" align="center" color="gray">
          If you do not have an account, please{' '}
          <Link to={EndpointsConfig.Auth.SignUp} style={{ fontWeight: 'bold' }}>
            Sign up
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default SignIn;
